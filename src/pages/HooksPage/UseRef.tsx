import { Card, CodeBlock } from "@/shared";
import { useRef, useState } from "react";

export function UseRef() {
  const [count, setCount] = useState(0);
  const renderCount = useRef<number>(0);

  // eslint-disable-next-line react-hooks/refs
  renderCount.current += 1;

  return (
    <Card border="2px" maxWidth="xl">
      <CodeBlock
        border="2px"
        title="Frontend"
        codeL={`${count}`}
        onClick={() => setCount((c) => c + 1)}
      />
    </Card>
  );
}
