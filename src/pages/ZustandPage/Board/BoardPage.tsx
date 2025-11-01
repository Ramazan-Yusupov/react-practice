import { BiTrashAlt } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { useStoreBoard } from "@/store/useStoreBoard";
import { Button } from "@/shared/ui/Button";

export function BoardPage() {
  const { columns, tasks, addColumn, removeColumn, addTask, removeTask } =
    useStoreBoard();

  return (
    <div className="flex justify-start gap-6 p-4">
      <div className="flex flex-col items-center gap-5">
        {columns.map((column) => (
          <div
            key={column.id}
            className="border-2 p-5 rounded-2xl w-sm min-h-[180px] relative flex flex-col"
          >
            <div className="flex justify-between items-center mb-3">
              <div className="font-semibold text-lg">{column.title}</div>
              <BiTrashAlt
                size={18}
                color="#f00"
                className="cursor-pointer  absolute top-3 -right-10 border-2 w-10 h-10 flex rounded-r-2xl items-center justify-center p-1"
                onClick={() => removeColumn(column.id)}
              />
            </div>

            {/* Список задач для этой колонки */}
            <div className="flex flex-col gap-2 grow overflow-auto">
              {tasks
                .filter((task) => task.columnId === column.id)
                .map((task) => (
                  <div
                    key={task.id}
                    className=" flex justify-between items-center p-2 border-2 rounded-2xl"
                  >
                    <div>{task.title}</div>
                    <BiTrashAlt
                      color="#f00"
                      className="cursor-pointer  w-8 h-8 flex  items-center justify-center p-1"
                      onClick={() => removeTask(task.id)}
                    />
                  </div>
                ))}
            </div>

            {/* Кнопка добавления новой задачи */}
            <Button
              onClick={() => addTask(column.id, "New Task")}
              className="mt-5"
            >
              <AiOutlinePlus />
              Add Task
            </Button>
          </div>
        ))}

        {/* Кнопка добавления новой колонки */}
        <AiOutlinePlus
          onClick={() => addColumn("New Column")}
          className="cursor-pointer border-2 rounded-full w-10 h-10 flex items-center justify-center"
          title="Add Column"
        />
      </div>
    </div>
  );
}
