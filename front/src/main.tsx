import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Auth0Provider } from "@auth0/auth0-react"

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Auth0Provider
    domain={import.meta.env.VITE_APP_DOMEIN}
    clientId={import.meta.env.VITE_APP_CLIENT_ID}
    redirectUri={window.location.origin}
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Auth0Provider>
)
