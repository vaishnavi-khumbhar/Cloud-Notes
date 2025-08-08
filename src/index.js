import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


// Create React root
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render App without StrictMode to avoid double rendering issues
root.render(
  <App />
);

// Optional: Measure performance
reportWebVitals();
