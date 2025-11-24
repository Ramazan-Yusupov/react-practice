import { Button } from "@/shared/ui/Button";
import { useEffect, useState } from "react";
import { CardBlock } from "./CardBlock";

interface Props {
  id: string;
  name: string;
}

export function UseEffectPage() {
  const [count, setCount] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [data, setData] = useState<Props[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  return (
    <div className="grid grid-cols-4 w-7xl gap-5">
      <CardBlock title={`Rendered: ${time > 10 ? 0 : time}`}>
        <div className="flex items-center gap-2">
          <Button onClick={() => setCount(count - 1)}>-</Button>
          <span>{count}</span>
          <Button onClick={() => setCount(count + 1)}>+</Button>
        </div>
      </CardBlock>

      <CardBlock title="Data">
        <div className="flex items-center gap-2">
          <ul>
            {data.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        </div>
      </CardBlock>
    </div>
  );
}
