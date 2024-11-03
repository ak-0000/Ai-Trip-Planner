import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Auth0Provider } from "@auth0/auth0-react";

createRoot(document.getElementById("root")).render(
  <Auth0Provider
  domain="dev-w0j3esdmz54hqvlw.us.auth0.com"
  clientId="g3jaC4q0HIXC3LpWASmgNpj09gE4dE2q"
  authorizationParams={{
    redirect_uri: window.location.origin
  }}>
    <App />
  </Auth0Provider>
);
