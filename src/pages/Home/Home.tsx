import { Card } from "@/components/Card";
import { CodeBlock } from "@/components/CodeBlock";
import { ErrorUI } from "@/components/ErrorUI";
import { LoadingUI } from "@/components/LoadingUI";
import { getData, type Todo } from "@/utils/getData";
import { useEffect, useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTodos() {
      setLoading(true);
      setError(null);
      try {
        const data = await getData(
          "https://jsonplaceholder.typicode.com/todos/?_limit=4",
        );
        setTodos(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchTodos();
  }, []);

  return (
    <div>
      <Card
        avatar
        isOnline
        maxWidth="xl"
        isErrorOnOff={!error}
        title="JSONPlaceholder"
      >
        {loading && <LoadingUI isLoading={loading} />}
        {error && <ErrorUI isError={error} />}
        {!loading && !error && todos.length > 0 && (
          <div className="space-y-4 mt-4">
            {todos.map((todo) => (
              <CodeBlock
                isBordered
                key={todo.id}
                code={todo.title}
                codeTitle={todo.completed ? "Completed" : "In progress"}
              />
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
