import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider
      clientId={
        "566063083458-51k9fvuupd3kju0klptht1p5ocuppqu7.apps.googleusercontent.com"
      }
    >
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
);
