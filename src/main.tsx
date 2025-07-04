import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import "./styles/_variables.scss";
import App from "./app/App";
import { Provider } from "react-redux";
import { store } from "./app/services/redux/store";
import { GoogleOAuthProvider } from "@react-oauth/google";

// ID клиента
const GOOGLE_CLIENT_ID =
  "984540388050-3gueuugbkftv0mrp5jop0e9dt17v48mr.apps.googleusercontent.com";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </StrictMode>
);
