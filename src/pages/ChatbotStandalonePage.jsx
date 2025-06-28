import React, { useState, useRef, useEffect } from 'react';

const ChatbotStandalonePage = () => {
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Bonjour ! Posez-moi vos questions sur la rougeole." }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { from: 'user', text: input }]);
    setTimeout(() => {
      setMessages((msgs) => [...msgs, { from: 'bot', text: "Je suis un assistant virtuel. Posez-moi vos questions sur la rougeole !" }]);
    }, 800);
    setInput('');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-100">
      <div className="w-full max-w-7xl flex flex-col items-center justify-center px-2">
        <h1 className="text-3xl font-semibold text-gray-900 mb-10 mt-16 text-center drop-shadow-sm">
          Rougeole : tout savoir en un clic.
        </h1>
        <div className="w-full flex flex-col items-center">
          <div className="w-full mb-8">
            <div className="flex flex-col gap-3 max-h-[500px] min-h-[300px] w-[80%] mx-auto overflow-y-auto mb-2 bg-white/80 rounded-3xl shadow-lg p-6 border border-gray-100">
              {messages.slice(1).map((msg, idx) => (
                <div key={idx} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`px-5 py-3 rounded-2xl max-w-[80%] break-words shadow ${msg.from === 'user' ? 'bg-red-500 text-white rounded-br-md' : 'bg-gray-100 text-gray-800 rounded-bl-md'}`}>{msg.text}</div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
          <form className="w-full flex items-center justify-center relative" onSubmit={handleSend}>
            <input
              type="text"
              className="flex-1 bg-white/90 border border-gray-200 rounded-full py-4 pl-6 pr-16 text-lg shadow focus:ring-2 focus:ring-red-200 outline-none placeholder-gray-400"
              placeholder="Posez votre question sur la rougeole..."
              value={input}
              onChange={e => setInput(e.target.value)}
              autoFocus
              style={{ boxShadow: '0 2px 16px 0 rgba(255,0,0,0.04)' }}
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-500 hover:bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition"
              aria-label="Envoyer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatbotStandalonePage; 