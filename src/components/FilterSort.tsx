import { Input } from "@/shared/ui/Input";
import { CodeBlock } from "../shared/ui/CodeBlock";
import { useState } from "react";
import { itemsMock } from "@/mockApi/itemsMock";
import { Button } from "@/shared/ui/Button";

export function FilterSort() {
  const [sort, setSort] = useState("");

  const sortedItems = [...itemsMock].sort((a, b) => {
    if (sort === "name") {
      return a.name.localeCompare(b.name);
    }
    if (sort === "price") {
      return a.price - b.price;
    }
    if (sort === "color") {
      return a.color.localeCompare(b.color);
    }
    return 0;
  });

  return (
    <>
      <Input
        value={sort}
        placeholder="Sort"
        onChange={(e) => setSort(e.target.value)}
      />
      <div className="flex justify-between gap-2 mb-4">
        <Button active={sort === ""} onClick={() => setSort("")}>
          {sort === "" ? "Sort Cleared" : "Clear Sort"}
        </Button>
        <Button active={sort === "name"} onClick={() => setSort("name")}>
          Sort by Name
        </Button>
        <Button active={sort === "price"} onClick={() => setSort("price")}>
          Sort by Price
        </Button>
        <Button active={sort === "color"} onClick={() => setSort("color")}>
          Sort by Color
        </Button>
      </div>
      {sortedItems.map((item) => (
        <CodeBlock
          isBordered
          key={item.id}
          codeL={item.price}
          codeR={item.color}
          codeTitle={item.name}
          colorR={sort === "color" ? "green" : "white"}
          colorL={sort === "price" ? "green" : "white"}
          colorTitle={sort === "name" ? "green" : "white"}
        />
      ))}
    </>
  );
}
