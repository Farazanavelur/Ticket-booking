import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext';
  // Correct
  // Removed invalid lines as they are not applicable in a React client-side application

const container = document.getElementById('root');
const root = createRoot(container); // Only create root once

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);