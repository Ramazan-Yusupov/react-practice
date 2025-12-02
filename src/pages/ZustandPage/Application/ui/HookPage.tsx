import { useState } from "react";
import { useDragList } from "@/hooks/useDragList";

interface Task {
  id: string;
  title: string;
}

const initialTasks: Task[] = [
  { id: "1", title: "Изучить React" },
  { id: "2", title: "Освоить TypeScript" },
  { id: "3", title: "Изучить TailwindCSS" },
  { id: "4", title: "Создать проект" },
];

export function HookPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const {
    draggedItem,
    dragOverIndex,
    dragItemRef,
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleDragEnd,
  } = useDragList({
    items: tasks,
    onReorder: setTasks,
    getId: (task) => task.id,
    updateId: (task, newId) => ({ ...task, id: newId }),
  });

  const getDragStyle = (index: number) => {
    if (dragOverIndex === index) {
      return "border-2 border-blue-500 bg-slate-600 scale-105";
    }
    return "border border-gray-200 hover:border-gray-300 hover:bg-slate-400";
  };

  return (
    <div className="p-6 bg-slate-500 rounded-lg shadow-md w-96">
      <h2 className="text-xl font-bold mb-4 ">Перетаскиваемый список</h2>

      <div className="space-y-2">
        {tasks.map((task, index) => (
          <div
            key={task.id}
            ref={index === draggedItem?.index ? dragItemRef : null}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
            className={`
              p-3 rounded-lg cursor-grab active:cursor-grabbing
              transition-all duration-200 ease-in-out
              ${getDragStyle(index)}
              ${draggedItem?.index === index ? "opacity-50" : "opacity-100"}
            `}
          >
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center">
                <span className="mr-3">⋮⋮</span>
                <span className="font-bold">{task.title}</span>
              </div>
              <div className="font-mono">{task.id}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-sm">
        {draggedItem
          ? "Перетаскивается..."
          : "Перетащите элементы для изменения порядка"}
      </div>
    </div>
  );
}
