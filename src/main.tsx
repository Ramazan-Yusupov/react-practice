import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./pages/App.tsx";
import { BrowserRouter } from "react-router-dom";
import { CountProvider } from "./context/CountContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <CountProvider>
        <App />
      </CountProvider>
    </BrowserRouter>
  </StrictMode>,
);
