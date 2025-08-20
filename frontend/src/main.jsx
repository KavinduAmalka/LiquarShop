import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AppContextProvider } from './context/AppContext.jsx'
import Auth0ProviderWithHistory from './components/Auth0Provider.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Auth0ProviderWithHistory>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </Auth0ProviderWithHistory>
  </BrowserRouter>,
)
