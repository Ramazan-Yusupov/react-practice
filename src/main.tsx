import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./pages/App.tsx";
import { BrowserRouter } from "react-router-dom";
import { CountProvider } from "./context/CountContext.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <CountProvider>
          <App />
        </CountProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
