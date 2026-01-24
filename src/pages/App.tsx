import { Routes, Route } from "react-router-dom";

import Home from "./Home/Home";
import { Layout } from "@/layout/Layout";
import { Settings } from "./Settings/Settings";
import { AuthProvider } from "@/contexts/AuthContext";
import { TypeScriptPage } from "./TypeScriptPage/TypeScriptPage";

export default function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/typescript" element={<TypeScriptPage />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </AuthProvider>
  );
}
