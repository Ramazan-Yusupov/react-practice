import { Routes, Route } from "react-router-dom";

import Home from "./Home/Home";
import { Layout } from "@/layout/Layout";
import { ReactComponents } from "./ReactComponents/ReactComponents";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ReactComponents" element={<ReactComponents />} />
      </Routes>
    </Layout>
  );
}
