import { Routes, Route } from "react-router-dom";

import Home from "./Home/Home";
import { Layout } from "@/layout/Layout";
import { ReactComponents } from "./ReactComponents/Page";
import { Settings } from "./Settings/Settings";
import { AuthProvider } from "@/contexts/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ReactComponents" element={<ReactComponents />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </AuthProvider>
  );
}
