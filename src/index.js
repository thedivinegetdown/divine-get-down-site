import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/tokens.css';
import './index.css'; // Global styles
import './styles/animations.css';
import './styles/primitives.css';
import App from './App'; // Main app component
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { initErrorMonitoring } from './utils/errorMonitoring';

initErrorMonitoring();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
