import { Input } from "@/shared/ui/Input";
import { useState } from "react";
import { devsMock } from "@/mockApi/itemsMock";
import { CodeBlock } from "@/components/CodeBlock";

export function FilterItemsA() {
  const [query, setQuery] = useState("");

  const filteredItems = devsMock.filter(
    (item) =>
      item.dev.toLowerCase().includes(query.toLowerCase()) ||
      item.lang.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <>
      <Input
        value={query}
        placeholder="Search"
        onChange={(e) => setQuery(e.target.value)}
      />
      {filteredItems.map((item) => (
        <CodeBlock
          isBordered
          key={item.id}
          codeL={item.lang}
          codeTitle={item.dev}
        />
      ))}
    </>
  );
}
