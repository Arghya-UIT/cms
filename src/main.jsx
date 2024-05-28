
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './AuthProvider.jsx'

const root = ReactDOM.createRoot(document.getElementById('root')); // Change here
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);