import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/app.scss';
import { AuthProvider } from './context/auth';
import { ChatProvider } from './context/chats';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <ChatProvider>
        <App />
      </ChatProvider>
    </AuthProvider>
  </React.StrictMode>
);
