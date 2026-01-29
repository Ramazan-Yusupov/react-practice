import { useEffect, useState } from "react";
import { Card } from "@/components/Card";
import { CodeBlock } from "@/components/CodeBlock";
import { Button } from "@/shared/ui/Button";

export default function Home() {
  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem("count");
    return saved !== null ? Number(saved) : 0;
  });

  useEffect(() => {
    localStorage.setItem("count", count.toString());
  }, [count]);

  return (
    <div>
      <Card
        avatar
        isOnline
        isErrorOnOff
        maxWidth="xl"
        title="Frontend"
        maxHeight={636}
      >
        <CodeBlock
          isBordered
          codeL="Count:"
          codeTitle="Frontend"
          codeR={`${count}/100`}
          onClick={() => setCount(count + 1)}
        />
        <Button
          title="Сбросить"
          disabled={count === 0}
          onClick={() => setCount(0)}
        />
      </Card>
    </div>
  );
}
