import { useState, useCallback } from 'react';
import { chatbotApi } from '../services/chatbotApi';

export const useChatbot = () => {
  const [messages, setMessages] = useState([
    { 
      from: 'bot', 
      text: 'Bonjour ! Comment puis-je vous aider concernant la rougeole ?',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = useCallback(async (userInput) => {
    if (!userInput.trim()) return;

    // Add user message to chat
    const userMessage = {
      from: 'user',
      text: userInput,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      // Call the API
      const response = await chatbotApi.sendMessage(userInput);
      
      // Add bot response to chat
      const botMessage = {
        from: 'bot',
        text: response.message || 'Désolé, je n\'ai pas pu traiter votre demande.',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Erreur de connexion au serveur. Veuillez réessayer.');
      
      // Add error message to chat
      const errorMessage = {
        from: 'bot',
        text: 'Désolé, je rencontre des difficultés techniques. Veuillez réessayer plus tard.',
        timestamp: new Date(),
        isError: true
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearChat = useCallback(() => {
    setMessages([
      { 
        from: 'bot', 
        text: 'Bonjour ! Comment puis-je vous aider concernant la rougeole ?',
        timestamp: new Date()
      }
    ]);
    setError(null);
  }, []);

  const testConnection = useCallback(async () => {
    try {
      const isConnected = await chatbotApi.testConnection();
      return isConnected;
    } catch (err) {
      console.error('Connection test failed:', err);
      return false;
    }
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearChat,
    testConnection
  };
}; 