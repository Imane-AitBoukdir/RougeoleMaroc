# API Integration Documentation

## Overview
This React app has been integrated with a chatbot API to provide real-time responses about measles (rougeole). The integration replaces the previous mock responses with actual API calls.

## Files Created/Modified

### New Files:
- `src/services/chatbotApi.js` - API service layer
- `src/hooks/useChatbot.js` - Custom React hook for chatbot functionality
- `src/config/api.js` - API configuration
- `API_INTEGRATION.md` - This documentation

### Modified Files:
- `src/pages/ChatbotPage.jsx` - Updated to use real API
- `src/pages/ChatbotStandalonePage.jsx` - Updated to use real API

## API Configuration

### Default Settings
The API is configured to connect to `http://localhost:5000/api/chat` by default.

### Changing API URL
To change the API URL, edit `src/config/api.js`:

```javascript
export const API_CONFIG = {
  BASE_URL: 'http://your-api-url:port/api', // Change this
  CHAT_ENDPOINT: '/chat',
  // ... other settings
};
```

## API Requirements

Your backend API should:

1. **Endpoint**: `POST /api/chat`
2. **Request Body**:
   ```json
   {
     "query": "user message here"
   }
   ```
3. **Response Format**:
   ```json
   {
     "message": "bot response here"
   }
   ```

## Features

### ✅ Implemented Features:
- Real-time API communication
- Loading states with visual indicators
- Error handling with user-friendly messages
- Connection status monitoring
- Timestamp display for messages
- Keyboard shortcuts (Enter to send)
- Auto-scroll to latest message
- Clear chat functionality
- Responsive design

### 🔧 Error Handling:
- Network connection errors
- API server errors
- Invalid responses
- Timeout handling

### 🎨 UI Enhancements:
- Loading spinners
- Connection status indicators
- Error message styling
- Disabled states during loading
- Smooth animations

## Usage

### Basic Usage
The chatbot is automatically available on:
- `/chatbot` - Main chatbot page
- `/chatbot-standalone` - Standalone chatbot interface

### Programmatic Usage
```javascript
import { useChatbot } from '../hooks/useChatbot';

const MyComponent = () => {
  const { messages, isLoading, sendMessage, clearChat } = useChatbot();
  
  const handleSend = async (message) => {
    await sendMessage(message);
  };
  
  // ... rest of component
};
```

## Testing

### API Connection Test
The app automatically tests the API connection on load. You'll see:
- 🟢 Green dot: API connected
- 🔴 Red dot: API disconnected
- ⚠️ Warning message: Offline mode

### Manual Testing
```javascript
import { chatbotApi } from '../services/chatbotApi';

// Test connection
const isConnected = await chatbotApi.testConnection();
console.log('API connected:', isConnected);

// Send test message
const response = await chatbotApi.sendMessage('Hello');
console.log('Response:', response.message);
```

## Troubleshooting

### Common Issues:

1. **CORS Errors**
   - Ensure your API server allows requests from your React app domain
   - Add appropriate CORS headers to your API

2. **Connection Refused**
   - Verify your API server is running on the correct port
   - Check the API URL in `src/config/api.js`

3. **API Not Responding**
   - Check your API server logs
   - Verify the endpoint format matches `/api/chat`

### Debug Mode
Enable console logging by checking the browser's developer tools console for detailed error messages.

## Migration from Desktop Script

The original desktop script:
```javascript
let handleChat = () => {
  let user_input = "testing API";
  fetch("http://localhost:5000/api/chat", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: user_input,
    }),
  })
  .then((response) => response.json())
  .then((data) => {
    let llm_response = data["message"];
    console.log(llm_response);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
};
```

Has been transformed into a React-compatible system with:
- ✅ Proper state management
- ✅ Error handling
- ✅ Loading states
- ✅ User interface
- ✅ Reusable components
- ✅ Configuration management 