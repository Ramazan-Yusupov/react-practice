import { Route, Routes } from "react-router-dom";
import { Layout } from "../Layout";
import { Home } from "./Home/Home";
import { BlockCode } from "./BlockCode/BlockCode";
import { ROUTES } from "@/routes";

export function App() {
  return (
    <Layout>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.BLOCK_CODE} element={<BlockCode />} />
      </Routes>
    </Layout>
  );
}
