import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HomePage from '@/pages/HomePage';
import AuthPage from '@/pages/AuthPage';
import ChatbotPage from '@/pages/ChatbotPage';
import ChatbotStandalonePage from '@/pages/ChatbotStandalonePage';
import { Toaster } from '@/components/ui/toaster';
import { Routes, Route, useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  const isChatbotStandalone = location.pathname === '/chatbot-standalone';
  return (
    <div className="min-h-screen bg-gray-50">
      {isChatbotStandalone ? <Header logoOnly /> : <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/auth/signup" element={<AuthPage />} />
        <Route path="/chatbot" element={<ChatbotPage />} />
        <Route path="/chatbot-standalone" element={<ChatbotStandalonePage />} />
      </Routes>
      <Footer />
      <Toaster />
      {/* Bouton flottant chatbot, sauf sur la page chatbot-standalone */}
      {!isChatbotStandalone && (
        <a
          href="/chatbot-standalone"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg w-16 h-16 flex items-center justify-center transition-all duration-200 group"
          title="Discuter avec le chatbot"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8c-4.418 0-8-2.686-8-6V7a2 2 0 012-2h12a2 2 0 012 2v7c0 3.314-3.582 6-8 6z" />
          </svg>
          <span className="absolute opacity-0 group-hover:opacity-100 bg-black text-white text-xs rounded px-2 py-1 bottom-20 right-0 pointer-events-none transition-opacity">Chatbot</span>
        </a>
      )}
    </div>
  );
}

export default App;