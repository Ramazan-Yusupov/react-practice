import { create } from "zustand";
import { nanoid } from "nanoid";
import { persist } from "zustand/middleware";

interface Column {
  id: string;
  title: string;
}
interface Task {
  id: string;
  columnId: string;
  title: string;
}

interface BoardState {
  columns: Column[];
  tasks: Task[];
  addColumn: (title: string) => void;
  removeColumn: (id: string) => void;
  addTask: (columnId: string, title: string) => void;
  removeTask: (id: string) => void;
}

export const useStoreBoard = create<BoardState>()(
  persist(
    (set) => ({
      columns: [],
      tasks: [],
      addColumn: (title: string) => {
        set((state) => ({
          columns: [...state.columns, { id: nanoid(), title }],
        }));
      },
      removeColumn: (id: string) => {
        set((state) => ({
          columns: state.columns.filter((column) => column.id !== id),
        }));
      },
      addTask: (columnId: string, title: string) => {
        set((state) => ({
          tasks: [...state.tasks, { id: nanoid(), columnId, title }],
        }));
      },
      removeTask: (id: string) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }));
      },
    }),
    {
      name: "todo-storage",
      partialize: (state) => ({ columns: state.columns }),
    }
  )
);
