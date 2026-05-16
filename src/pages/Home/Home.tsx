import { Button, Card, CodeBlock, Input } from "@/shared/ui";
import { useState } from "react";

type User = { id: number; name: string };

export function Home() {
  const [count, setCount] = useState<number>(0);
  const [isShow, setIsShow] = useState(true);
  const [value, setValue] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  return (
    <Card maxWidth="2xl" border="2px">
      <div className="flex justify-center w-full gap-5">
        <Button title="Increment" onClick={() => setCount(count + 1)} />
        <CodeBlock border="1px" title="Users:" codeL={count || "0"} />
        <Button title="Decrement" onClick={() => setCount(count - 1)} />
        <Button
          title="Reset"
          variant="primary"
          disabled={count === 0}
          onClick={() => setCount(0)}
        />
      </div>

      <Input value={value} onChange={(e) => setValue(e.target.value)} />
      <div className="flex justify-between gap-5">
        <Button
          title={isShow ? "Hide" : "Show"}
          onClick={() => setIsShow(!isShow)}
        />
        {isShow && <CodeBlock border="1px" title="Role:" codeL={value} />}
        <div className="flex gap-5">
          <Button
            disabled={!value}
            variant="danger"
            title="Clear"
            onClick={() => setValue("")}
          />
          <Button
            disabled={!value}
            variant="ghost"
            title="Add User"
            onClick={() =>
              setUsers((users) => [...users, { id: Date.now(), name: value }])
            }
          />
        </div>
      </div>
      {users.map((user) => (
        <CodeBlock key={user.id} border="1px" title="User:" codeL={user.name} />
      ))}
    </Card>
  );
}
