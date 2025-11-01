import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  blurred: boolean;
  edited: boolean;
}

type Filter = "all" | "active" | "completed";

interface TodoState {
  todos: Todo[];
  filter: Filter;
  addTodo: (todo: Todo) => void;
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  blurTodo: (id: number) => void;
  setFilter: (filter: Filter) => void;
  editTodo: (id: number, text: string) => void;
  toggleEdit: (id: number) => void;
}

export const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      todos: [],
      filter: "all",
      addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
      removeTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        })),
      blurTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, blurred: !todo.blurred } : todo
          ),
        })),
      setFilter: (filter) => set({ filter }),
      editTodo: (id, text) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, text } : todo
          ),
        })),
      toggleEdit: (id: number) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, edited: !todo.edited } : todo
          ),
        })),
    }),
    {
      name: "todo-storage",
      partialize: (state) => ({ todos: state.todos, filter: state.filter }),
    }
  )
);
