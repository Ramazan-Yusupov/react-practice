import { Routes, Route } from "react-router-dom";

import Home from "./Home/Home";
import { Layout } from "@/layout/Layout";
import { JsPage } from "./JsPage/JsPage";
import { TodoPage } from "./ZustandPage/Todo/TodoPage";
import { BoardPage } from "./ZustandPage/Board/BoardPage";
import { Application } from "./ZustandPage/Application/Application";
import { HooksPage } from "./HooksPage/HooksPage";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jspage" element={<JsPage />} />
        <Route path="/zustandpage/todo" element={<TodoPage />} />
        <Route path="/zustandpage/board" element={<BoardPage />} />
        <Route path="/zustandpage/application" element={<Application />} />
        <Route path="/hookspage" element={<HooksPage />} />
      </Routes>
    </Layout>
  );
}
