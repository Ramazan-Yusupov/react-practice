import { Input } from "@/shared/ui/Input";
import { CodeBlock } from "@/shared/ui/CodeBlock";
import { useState } from "react";
import { devsMock } from "@/mockApi/itemsMock";

export function FilterSearchA() {
  const [query, setQuery] = useState("");

  const filteredSearch = devsMock.filter(
    (item) =>
      item.dev.toLowerCase().includes(query.toLowerCase()) ||
      item.lang.toLowerCase().includes(query.toLowerCase()) ||
      item.age.toString().includes(query.toString()),
  );
  return (
    <>
      <Input
        value={query}
        placeholder="Search"
        onChange={(e) => setQuery(e.target.value)}
      />
      {filteredSearch.map((item) => (
        <CodeBlock
          isBordered
          key={item.id}
          codeL={item.lang}
          codeR={item.age}
          codeTitle={item.dev}
        />
      ))}
    </>
  );
}
