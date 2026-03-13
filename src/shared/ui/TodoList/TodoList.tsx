import { useLocalStorage } from "@/hooks";
import { Card, CodeBlock } from "@/shared";

interface TodoProps {
  id: string;
  text: string;
}

const generateId = (): string => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
};

export function TodoList() {
  const [inputValue, setInputValue] = useLocalStorage("inputValue", "");
  const [todo, setTodo] = useLocalStorage<TodoProps[]>("todo", []);

  const handleAddTodo = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    setTodo([...todo, { id: generateId(), text: trimmed }]);
    setInputValue("");
  };

  const handleDeleteTodo = (id: string) => {
    setTodo(todo.filter((item) => item.id !== id));
  };

  return (
    <Card
      isInput
      isBtnAdd
      border="2px"
      maxWidth="xl"
      title="Todo List"
      maxHeight="310px"
      value={inputValue}
      onClick={handleAddTodo}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setInputValue(e.target.value)
      }
    >
      {todo.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No tasks yet. Add one!</p>
      ) : (
        todo.map((item) => (
          <div key={item.id} className="group relative">
            <CodeBlock
              border="2px"
              title={item.text}
              onDelete={() => handleDeleteTodo(item.id)}
            />
          </div>
        ))
      )}
    </Card>
  );
}
