import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Auth0Provider
    domain={import.meta.env.VITE_APP_DOMEIN}
    clientId={import.meta.env.VITE_APP_CLIENT_ID}
    //@ts-ignore
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>
);
