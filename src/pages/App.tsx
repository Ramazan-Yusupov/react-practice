import { Route, Routes } from "react-router-dom";
import { Home } from "./Home/Home";
import { BlockCode } from "./BlockCode/BlockCode";
import { PAGES } from "@/config";
import { Layout } from "@/Layout";

export function App() {
  return (
    <Layout>
      <Routes>
        <Route path={PAGES.HOME} element={<Home />} />
        <Route path={PAGES.BLOCKCODE} element={<BlockCode />} />
      </Routes>
    </Layout>
  );
}
