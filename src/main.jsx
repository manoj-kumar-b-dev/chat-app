import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './Projects/Chat App/App.jsx'
import { AuthContextProvider } from './Projects/Chat App/Context/AuthContext.jsx'
import './index.css'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </StrictMode>
)
