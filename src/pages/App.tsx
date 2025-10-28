import { Routes, Route } from "react-router-dom";

import Home from "./Home/Home";
import { Layout } from "../layout/Layout";
import { JsPage } from "./JsPage/JsPage";
import { ZustandPage } from "./ZustandPage/ZustandPage";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jspage" element={<JsPage />} />
        <Route path="/zustandpage" element={<ZustandPage />} />
      </Routes>
    </Layout>
  );
}
