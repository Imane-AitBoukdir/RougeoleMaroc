import { API_CONFIG, getChatApiUrl } from '../config/api';

export const chatbotApi = {
  /**
   * Send a message to the chatbot API
   * @param {string} query - The user's message
   * @returns {Promise<Object>} - The API response
   */
  async sendMessage(query) {
    try {
      const response = await fetch(getChatApiUrl(), {
        method: 'POST',
        headers: API_CONFIG.DEFAULT_HEADERS,
        body: JSON.stringify({
          query: query,
        }),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error calling chatbot API:', error);
      throw error;
    }
  },

  /**
   * Test the API connection
   * @returns {Promise<boolean>} - True if API is reachable
   */
  async testConnection() {
    try {
      const response = await fetch(getChatApiUrl(), {
        method: 'POST',
        headers: API_CONFIG.DEFAULT_HEADERS,
        body: JSON.stringify({
          query: 'test',
        }),
      });
      return response.ok;
    } catch (error) {
      console.error('API connection test failed:', error);
      return false;
    }
  }
}; 