from typing import TypedDict, List
from langgraph.graph import StateGraph, START, END
from sentence_transformers import SentenceTransformer
import faiss
import json
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch
from huggingface_hub import login
import os
import PyPDF2
import re
import redis
import hashlib
import time

# === Redis Setup ===
REDIS_HOST = os.getenv("REDIS_HOST", "localhost")
REDIS_PORT = int(os.getenv("REDIS_PORT", 6379))
REDIS_DB = int(os.getenv("REDIS_DB", 0))
CACHE_TTL_SECONDS = 3600  # 1 hour

try:
    redis_client = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, db=REDIS_DB)
    redis_client.ping()
    print(f"[CACHE] Connected to Redis at {REDIS_HOST}:{REDIS_PORT}/{REDIS_DB}")
except redis.RedisError as e:
    print(f"[CACHE] Redis not available, fallback to local memory cache: {e}")
    redis_client = None
    local_cache = {}

def compute_cache_key(query: str, mode: str) -> str:
    h = hashlib.sha256()
    h.update(f"{mode}:{query}".encode("utf-8"))
    return h.hexdigest()

# === 1. Define agent state ===
class AgentState(TypedDict):
    query: str
    context: str
    answer: str

# === 2. Load and chunk data ===
DATA_PATH = "./measles.pdf"
CHUNK_SIZE = 200
CHUNK_OVERLAP = 50

def extract_text_from_pdf(pdf_path: str) -> str:
    text = ""
    with open(pdf_path, 'rb') as file:
        pdf_reader = PyPDF2.PdfReader(file)
        for page in pdf_reader.pages:
            text += page.extract_text() + "\n"
    return text

def clean_text(text: str) -> str:
    text = re.sub(r'\s+', ' ', text)
    text = text.strip()
    return text

def chunk_text(text: str) -> List[str]:
    sentences = re.split(r'(?<=[.!?])\s+', text)
    chunks = []
    current_chunk = []
    current_length = 0

    for sentence in sentences:
        sentence = sentence.strip()
        if not sentence:
            continue

        if current_length + len(sentence) > CHUNK_SIZE:
            if current_chunk:
                chunks.append(' '.join(current_chunk))
            current_chunk = [sentence]
            current_length = len(sentence)
        else:
            current_chunk.append(sentence)
            current_length += len(sentence)

    if current_chunk:
        chunks.append(' '.join(current_chunk))

    return chunks

raw_text = extract_text_from_pdf(DATA_PATH)
cleaned_text = clean_text(raw_text)
chunks = chunk_text(cleaned_text)

metadata = [{
    "source": "WHO Measles Fact Sheet",
    "page": "PDF Document",
    "id": i
} for i in range(len(chunks))]

# === 3. Build FAISS index ===
embedder = SentenceTransformer("all-MiniLM-L6-v2")
embeddings = embedder.encode(chunks, convert_to_numpy=True)
dimension = embeddings.shape[1]
index = faiss.IndexFlatL2(dimension)
index.add(embeddings)

# === 4. Load LLM ===
hf_token = os.getenv("HF_TOKEN")
login(hf_token)

MODEL_ID = "UBC-NLP/NileChat-3B"
tokenizer = AutoTokenizer.from_pretrained(MODEL_ID)
model = AutoModelForCausalLM.from_pretrained(
    MODEL_ID,
    device_map="auto",
    torch_dtype=torch.bfloat16 if torch.cuda.is_available() else torch.float32,
)
model.eval()

# === 5. LangGraph Nodes ===
def retrieve_context(state: AgentState) -> dict:
    query = state["query"]
    q_vec = embedder.encode([query])
    D, I = index.search(q_vec, 3)
    retrieved_chunks = [f"[Source: {metadata[i]['source']}] {chunks[i].strip()}" for i in I[0]]
    return {"context": "\n\n".join(retrieved_chunks)}

def generate_answer(state: AgentState) -> dict:
    prompt = (
        f"You are a medical expert specialized in measles.\n"
        f"Use the following context to answer the question clearly and accurately.\n"
        f"If the context doesn't contain enough information to answer the question, say so.\n\n"
        f"Context:\n{state['context']}\n\n"
        f"Question: {state['query']}\nAnswer:"
    )
    inputs = tokenizer(prompt, return_tensors="pt").to(model.device)
    outputs = model.generate(
        **inputs,
        max_new_tokens=512,
        temperature=0.7,
        top_p=0.9,
        do_sample=True,
        pad_token_id=tokenizer.eos_token_id
    )
    decoded = tokenizer.decode(outputs[0], skip_special_tokens=True)
    if "Answer:" in decoded:
        answer = decoded.split("Answer:")[-1].strip()
    else:
        answer = decoded.strip()

    return {"answer": answer}

def generate_quiz(state: AgentState) -> dict:
    prompt = (
        f"You are a medical quiz generator. Based on the following context, generate 3 multiple-choice questions "
        f"with 4 choices each (A to D), and indicate the correct answer for each.\n\n"
        f"Context:\n{state['context']}\n\n"
        f"Output format:\n"
        f"[{{'question': ..., 'choices': ['A...', 'B...', 'C...', 'D...'], 'answer': 'B'}}]\n"
    )
    inputs = tokenizer(prompt, return_tensors="pt").to(model.device)
    outputs = model.generate(
        **inputs,
        max_new_tokens=512,
        temperature=0.7,
        top_p=0.9,
        do_sample=True
    )
    result = tokenizer.decode(outputs[0], skip_special_tokens=True)

    try:
        quiz = eval(result[result.find("["): result.rfind("]") + 1])
    except Exception:
        quiz = [{"question": "Error parsing quiz", "choices": [], "answer": ""}]
    return {"answer": quiz}

# === 6. Build LangGraphs ===
graph_builder_qa = StateGraph(AgentState)
graph_builder_qa.add_node("retrieve_context", retrieve_context)
graph_builder_qa.add_node("generate_answer", generate_answer)
graph_builder_qa.add_edge(START, "retrieve_context")
graph_builder_qa.add_edge("retrieve_context", "generate_answer")
graph_builder_qa.add_edge("generate_answer", END)
graph_builder_qa.set_entry_point("retrieve_context")
graph_qa = graph_builder_qa.compile()

graph_builder_quiz = StateGraph(AgentState)
graph_builder_quiz.add_node("retrieve_context", retrieve_context)
graph_builder_quiz.add_node("generate_quiz", generate_quiz)
graph_builder_quiz.add_edge(START, "retrieve_context")
graph_builder_quiz.add_edge("retrieve_context", "generate_quiz")
graph_builder_quiz.add_edge("generate_quiz", END)
graph_builder_quiz.set_entry_point("retrieve_context")
graph_quiz = graph_builder_quiz.compile()

# === 7. Run Agent with Memory ===
def run_agent_with_memory(query: str, mode: str) -> str | List[dict]:
    key = compute_cache_key(query, mode)

    # Try Redis
    if redis_client:
        cached = redis_client.get(key)
        if cached:
            print(f"[CACHE] Redis hit: {query}")
            return json.loads(cached)

    # Try local memory fallback
    elif 'local_cache' in globals() and key in local_cache:
        print(f"[CACHE] Local cache hit: {query}")
        return local_cache[key]

    # Cache miss
    print(f"[CACHE] MISS: {query}")
    state = AgentState(query=query, context="", answer="")
    if mode == "quiz":
        final_state = graph_quiz.invoke(state)
    else:
        final_state = graph_qa.invoke(state)

    result = final_state["answer"]

    # Save in Redis
    if redis_client:
        redis_client.set(key, json.dumps(result), ex=CACHE_TTL_SECONDS)

    # Save in local memory fallback
    elif 'local_cache' in globals():
        local_cache[key] = result

    return result

if __name__ == "__main__":
    query = "What is the capital of France?"
    mode = "not_quiz"
    result = run_agent_with_memory(query, mode)
    print(result)
