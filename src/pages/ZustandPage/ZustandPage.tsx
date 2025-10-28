import { useState } from "react";
import {
  AiOutlineEdit,
  AiOutlineCheck,
  AiOutlineDelete,
  AiOutlinePlus,
  AiOutlineClose,
} from "react-icons/ai";
import { TbBlur } from "react-icons/tb";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/input";
import { useTodoStore } from "@/store/useStoreZustand";

export function ZustandPage() {
  const {
    todos,
    filter,
    addTodo,
    removeTodo,
    toggleTodo,
    blurTodo,
    setFilter,
    editTodo,
    toggleEdit,
  } = useTodoStore();

  const [value, setValue] = useState("");
  // Локальный стейт для редактирования текста текущей задачи
  const [editText, setEditText] = useState<string>("");

  const submit = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    addTodo({
      id: Date.now(),
      text: trimmed,
      completed: false,
      blurred: false,
      edited: false,
    });
    setValue("");
  };

  // Фильтрация задач по текущему фильтру
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true; // all
  });

  // Обработчик начала редактирования
  const startEditing = (todo: { id: number; text: string }) => {
    toggleEdit(todo.id);
    setEditText(todo.text);
  };

  // Обработчик отмены редактирования
  const cancelEditing = (id: number) => {
    toggleEdit(id);
    setEditText("");
  };

  // Обработчик сохранения изменений
  const saveEditing = (id: number) => {
    const trimmed = editText.trim();
    if (trimmed) {
      editTodo(id, trimmed);
    }
    toggleEdit(id);
    setEditText("");
  };

  return (
    <div className="flex justify-start">
      <div className="flex flex-col border-2 rounded-2xl p-5 max-w-2xl w-full">
        <div className="flex justify-between items-center w-full">
          <div className="font-semibold text-2xl">Todo</div>
          <div className="flex gap-5">
            <Button
              size="lg"
              variant={filter === "all" ? "secondary" : "default"}
              onClick={() => setFilter("all")}
            >
              All
            </Button>
            <Button
              size="lg"
              variant={filter === "active" ? "secondary" : "default"}
              onClick={() => setFilter("active")}
            >
              Active
            </Button>
            <Button
              size="lg"
              variant={filter === "completed" ? "secondary" : "default"}
              onClick={() => setFilter("completed")}
            >
              Completed
            </Button>
          </div>
        </div>
        <div className="flex gap-5 items-center mt-5">
          <Input
            placeholder="Add a new todo"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") submit();
            }}
          />
          <Button size="lg" onClick={submit}>
            <AiOutlinePlus color="#0f0" />
          </Button>
        </div>
        <div className="mt-5 flex flex-col gap-5">
          {filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className="border-2 p-3 rounded-2xl flex gap-5 items-center justify-between w-full"
            >
              {todo.edited ? (
                <div className="flex items-center gap-2 w-full">
                  <Input
                    className="grow"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveEditing(todo.id);
                      if (e.key === "Escape") cancelEditing(todo.id);
                    }}
                    autoFocus
                  />
                  <Button size="sm" onClick={() => saveEditing(todo.id)}>
                    <AiOutlineCheck size={20} color="#0f0" />
                  </Button>
                  <Button size="sm" onClick={() => cancelEditing(todo.id)}>
                    <AiOutlineClose size={20} color="#f00" />
                  </Button>
                </div>
              ) : (
                <div
                  className={`font-semibold text-lg transition-all duration-300 cursor-pointer ${
                    todo.completed ? "line-through text-green-500" : ""
                  } ${todo.blurred ? "blur" : ""}`}
                  onDoubleClick={() => startEditing(todo)}
                  title="Double click to edit"
                >
                  {todo.text}
                </div>
              )}
              {!todo.edited && (
                <div className="flex gap-5">
                  <Button size="lg" onClick={() => startEditing(todo)}>
                    <AiOutlineEdit size={30} color="#f00" />
                  </Button>
                  <Button size="lg" onClick={() => blurTodo(todo.id)}>
                    <TbBlur size={30} color={todo.blurred ? "#0f0" : "#f00"} />
                  </Button>
                  <Button size="lg" onClick={() => toggleTodo(todo.id)}>
                    <AiOutlineCheck
                      size={30}
                      color={todo.completed ? "#0f0" : "#f00"}
                    />
                  </Button>
                  <Button size="lg" onClick={() => removeTodo(todo.id)}>
                    <AiOutlineDelete color="#f00" />
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredTodos.length === 0 && (
          <div className="text-center text-gray-500">No todos found</div>
        )}
      </div>
    </div>
  );
}
