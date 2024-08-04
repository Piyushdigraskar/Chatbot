import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserProvider } from './context/userContext.jsx'
import { ChatProvider } from './context/chatContext.jsx'


export const server = "http://localhost:5000";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <ChatProvider>
       <App />
      </ChatProvider>
    </UserProvider>
  </React.StrictMode>,
)
