import { Input } from "@/shared/ui/Input";
import { CodeBlock } from "../../shared/ui/CodeBlock";
import { useState } from "react";
import { devsMock } from "../mockApi/itemsMock";
import { Button } from "@/shared/ui/Button";

export function FindSearchA() {
  const [searchName, setSearchName] = useState("");
  const [devs, setDevs] = useState(devsMock);

  const handleSearch = () => {
    if (!searchName) {
      setDevs(devsMock);
      return;
    }
    const item = devsMock.find(
      (i) =>
        i.dev.toLowerCase() === searchName.toLowerCase() ||
        i.lang.toLowerCase() === searchName.toLowerCase() ||
        i.age.toString() === searchName.toLowerCase(),
    );
    setDevs(item ? [item] : []);
  };

  const handleDelete = (id: number) => {
    setDevs((prevDevs) => prevDevs.filter((item) => item.id !== id));
  };

  return (
    <>
      <div className="flex gap-5">
        <Input
          value={searchName}
          placeholder="Search"
          onChange={(e) => setSearchName(e.target.value)}
        />
        <Button onClick={handleSearch} disabled={searchName === ""}>
          Find
        </Button>
      </div>
      {devs.map((item) => (
        <CodeBlock
          isBordered
          key={item.id}
          codeL={item.lang}
          codeR={item.age}
          codeTitle={item.dev}
          onDelete={() => handleDelete(item.id)}
        />
      ))}
      {devs.length === 0 && <p className="text-center">No results found.</p>}
    </>
  );
}
