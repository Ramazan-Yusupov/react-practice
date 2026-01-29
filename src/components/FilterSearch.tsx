import { Input } from "@/shared/ui/Input";
import { CodeBlock } from "./CodeBlock";
import { useState, useEffect } from "react";
import { devsMock } from "@/mockApi/itemsMock";

export function FilterSearch() {
  const [query, setQuery] = useState("");
  const [devs, setDevs] = useState(devsMock);

  // Load from localStorage on mount
  useEffect(() => {
    const savedDevs = localStorage.getItem("devs");
    if (savedDevs) {
      setDevs(JSON.parse(savedDevs));
    }
  }, []);

  // Save to localStorage when devs change
  useEffect(() => {
    localStorage.setItem("devs", JSON.stringify(devs));
  }, [devs]);

  const filteredSearch = devs.filter(
    (item) =>
      item.age.toString().includes(query.toString()) ||
      item.dev.toLowerCase().includes(query.toLowerCase()) ||
      item.lang.toLowerCase().includes(query.toLowerCase()),
  );

  const handleDelete = (id: number) => {
    setDevs((prevDevs) => prevDevs.filter((item) => item.id !== id));
  };

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
          onDelete={() => handleDelete(item.id)}
        />
      ))}
      {filteredSearch.length === 0 && (
        <p className="text-center">No results found.</p>
      )}
    </>
  );
}
