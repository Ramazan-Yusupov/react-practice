import { Input } from "@/shared/ui/Input";
import { CodeBlock } from "./CodeBlock";
import { useState } from "react";
import { devsMock } from "@/mockApi/itemsMock";

export function FilterSearch() {
  const [query, setQuery] = useState("");

  const filteredSearch = devsMock.filter(
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
      {filteredSearch.map((item) => (
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
