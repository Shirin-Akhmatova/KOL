import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./app/App";
import { Provider } from "react-redux";
import {store} from './app/services/redux/store'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  </StrictMode>
);
