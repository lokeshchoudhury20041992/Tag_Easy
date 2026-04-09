import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import ReactGA from 'react-ga4'
import App from './App.jsx'
import './styles/index.css'

ReactGA.initialize(import.meta.env.VITE_GA_TRACKING_ID || "G-XXXXXXXXXX");

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>,
)
