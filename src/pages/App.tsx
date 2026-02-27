import { Route, Routes } from "react-router-dom";
import { Layout } from "../Layout";
import { Home } from "./Home/Home";
import { BlockCode } from "./BlockCode/BlockCode";

export function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/BlockCode" element={<BlockCode />} />
      </Routes>
    </Layout>
  );
}
