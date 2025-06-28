import React, { useState, useRef, useEffect } from 'react';

const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Bonjour ! Comment puis-je vous aider concernant la rougeole ?' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { from: 'user', text: input }]);
    // Simule une réponse du bot
    setTimeout(() => {
      setMessages((msgs) => [...msgs, { from: 'bot', text: "Je suis un assistant virtuel. Posez-moi vos questions sur la rougeole !" }]);
    }, 800);
    setInput('');
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full bg-white rounded-xl shadow-lg p-8 flex flex-col gap-4">
        <h2 className="text-2xl font-bold mb-4 text-red-600">Chatbot</h2>
        <div className="flex-1 overflow-y-auto mb-4 max-h-96 border rounded-lg bg-gray-50 p-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`mb-2 flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`px-4 py-2 rounded-lg ${msg.from === 'user' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800'}`}>{msg.text}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form className="flex gap-2" onSubmit={handleSend}>
          <input
            type="text"
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            placeholder="Écrivez votre message..."
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">Envoyer</button>
        </form>
      </div>
    </section>
  );
};

export default ChatbotPage; 