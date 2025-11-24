import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./pages/App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./pages/HooksPage/ui/ThemeContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider value="dark">
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
