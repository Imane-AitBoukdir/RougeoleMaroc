// API Configuration
export const API_CONFIG = {
  // Base URL for the chatbot API
  BASE_URL: 'http://localhost:5000/api',
  
  // Chat endpoint
  CHAT_ENDPOINT: '/chat',
  
  // Request timeout in milliseconds
  TIMEOUT: 30000,
  
  // Default headers
  DEFAULT_HEADERS: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
};

// Helper function to get full API URL
export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Helper function to get chat API URL
export const getChatApiUrl = () => {
  return getApiUrl(API_CONFIG.CHAT_ENDPOINT);
}; 