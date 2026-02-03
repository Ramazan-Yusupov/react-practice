import { CodeBlock } from "@/shared/ui/CodeBlock";
import { countMock } from "@/mockApi/itemsMock";
import { useState } from "react";

export function CounterCard() {
  const [counts, setCounts] = useState(() => {
    const initialCounts: { [key: number]: number } = {};
    countMock.forEach((item) => {
      initialCounts[item.id] = 1;
    });
    return initialCounts;
  });

  function handleClick(id: number) {
    setCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  }

  return (
    <>
      {countMock.map((item) => (
        <CodeBlock
          key={item.id}
          isBordered
          codeL={counts[item.id]}
          codeTitle={item.name}
          onClick={() => handleClick(item.id)}
        />
      ))}
    </>
  );
}
