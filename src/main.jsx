import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/css/main.css'
import App from './App.jsx'
import 'aos/dist/aos.css'
import 'glightbox/dist/css/glightbox.min.css';




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
