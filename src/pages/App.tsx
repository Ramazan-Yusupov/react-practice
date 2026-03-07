import { Route, Routes } from "react-router-dom";
import { Home } from "./Home/Home";
import { BlockCode } from "./BlockCode/BlockCode";
import { PAGES } from "@/config";

export function App() {
  return (
    <Routes>
      <Route path={PAGES.HOME} element={<Home />} />
      <Route path={PAGES.BLOCKCODE} element={<BlockCode />} />
    </Routes>
  );
}
