import { TodoList } from "@/shared";
import { UseState } from "../HooksPage/UseState";

export function Home() {
  return (
    <div className="flex flex-col gap-5">
      <UseState />
      <TodoList />
    </div>
  );
}
