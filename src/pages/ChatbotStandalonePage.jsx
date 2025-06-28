import React, { useState, useRef, useEffect } from 'react';
import { useChatbot } from '../hooks/useChatbot';

const ChatbotStandalonePage = () => {
  const { messages, isLoading, error, sendMessage, clearChat, testConnection } = useChatbot();
  const [input, setInput] = useState('');
  const [isConnected, setIsConnected] = useState(true);
  const messagesEndRef = useRef(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Test API connection on component mount
    const checkConnection = async () => {
      const connected = await testConnection();
      setIsConnected(connected);
    };
    checkConnection();
  }, [testConnection]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    const userInput = input;
    setInput('');
    await sendMessage(userInput);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-100">
      <div className="w-full max-w-7xl flex flex-col items-center justify-center px-2">
        <h1 className="text-3xl font-semibold text-gray-900 mb-10 mt-16 text-center drop-shadow-sm">
          Rougeole : tout savoir en un clic.
        </h1>
        
        {/* Connection status */}
        {!isConnected && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded-lg mb-4 max-w-md">
            <div className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">Mode hors ligne activé</span>
            </div>
          </div>
        )}

        <div className="w-full flex flex-col items-center">
          <div className="w-full mb-8">
            <div className="flex flex-col gap-3 max-h-[500px] min-h-[300px] w-[80%] mx-auto overflow-y-auto mb-2 bg-white/80 rounded-3xl shadow-lg p-6 border border-gray-100">
              {messages.slice(1).map((msg, idx) => (
                <div key={idx} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`px-5 py-3 rounded-2xl max-w-[80%] break-words shadow ${
                    msg.from === 'user' 
                      ? 'bg-red-500 text-white rounded-br-md' 
                      : msg.isError
                        ? 'bg-red-200 text-red-800 border border-red-300 rounded-bl-md'
                        : 'bg-gray-100 text-gray-800 rounded-bl-md'
                  }`}>
                    <div className="text-sm">{msg.text}</div>
                    <div className={`text-xs mt-1 ${
                      msg.from === 'user' ? 'text-red-100' : 'text-gray-500'
                    }`}>
                      {msg.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Loading indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 px-5 py-3 rounded-2xl rounded-bl-md shadow">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                      <span className="text-sm text-gray-500">En train d'écrire...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>
          <form className="w-full flex items-center justify-center relative" onSubmit={handleSend}>
            <input
              type="text"
              className="flex-1 bg-white/90 border border-gray-200 rounded-full py-4 pl-6 pr-16 text-lg shadow focus:ring-2 focus:ring-red-200 outline-none placeholder-gray-400 disabled:bg-gray-100"
              placeholder={isLoading ? "Veuillez patienter..." : "Posez votre question sur la rougeole..."}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              autoFocus
              style={{ boxShadow: '0 2px 16px 0 rgba(255,0,0,0.04)' }}
            />
            <button
              type="submit"
              className={`absolute right-2 top-1/2 -translate-y-1/2 rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition ${
                isLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-red-500 hover:bg-red-600'
              } text-white`}
              disabled={isLoading}
              aria-label="Envoyer"
            >
              {isLoading ? (
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatbotStandalonePage; 