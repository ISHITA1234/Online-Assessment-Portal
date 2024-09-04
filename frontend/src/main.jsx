import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { OutputProvider } from './OutputContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <OutputProvider>
      <App />
    </OutputProvider>
  </React.StrictMode>,
);
