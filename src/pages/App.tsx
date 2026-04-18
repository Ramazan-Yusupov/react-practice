import { Route, Routes } from "react-router-dom";
import { Home } from "./Home/Home";
import { PAGES } from "@/config";
import { Layout } from "@/Layout";

export function App() {
  return (
    <Layout>
      <Routes>
        <Route path={PAGES.HOME} element={<Home />} />
      </Routes>
    </Layout>
  );
}
