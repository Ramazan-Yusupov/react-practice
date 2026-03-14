import { Card, CodeBlock, Input, Select } from "@/shared";
import { useMemo, useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  rating: number;
}

const generateProducts = (): Product[] => {
  return Array.from({ length: 1000 }, (_, index) => ({
    id: index + 1,
    name: `Product ${index + 1}`,
    price: Math.floor(Math.random() * 1000) + 100,
    category: ["Electronics", "Clothing", "Books", "Home"][
      Math.floor(Math.random() * 4)
    ],
    rating: Math.floor(Math.random() * 5) + 1,
  }));
};

export function UseMemo() {
  const [products] = useState<Product[]>(generateProducts());
  const [filter, setFilter] = useState<string>("");
  const [sort, setSort] = useState<"price" | "rating">("price");

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) =>
      product.name.toLowerCase().includes(filter.toLowerCase()),
    );

    result = result.sort((a, b) => {
      if (sort === "price") return a.price - b.price;
      return b.rating - a.rating;
    });

    return result;
  }, [products, filter, sort]);

  return (
    <Card
      border="2px"
      maxWidth="xl"
      maxHeight="370px"
      className="p-6 space-y-4"
    >
      <CodeBlock
        border="2px"
        title="Catalog of Products"
        codeL={filteredProducts.length}
      />

      <div className="flex flex-col md:flex-row gap-4">
        <Input
          value={filter}
          placeholder="Filter products..."
          onChange={(e) => setFilter(e.target.value)}
          className="flex-1"
        />

        <Select
          value={sort}
          onChange={(val) => setSort(val as "price" | "rating")}
          options={[
            { value: "price", label: "Sort by Price" },
            { value: "rating", label: "Sort by Rating" },
          ]}
          className="md:w-48"
        />
      </div>

      {filteredProducts.slice(0, 10).map((product) => (
        <CodeBlock
          border="2px"
          title={product.name}
          codeL={product.price}
          key={product.id}
        />
      ))}
      {filteredProducts.length > 10 && (
        <CodeBlock
          border="2px"
          title={`... и еще ${filteredProducts.length - 10} товаров`}
        />
      )}
    </Card>
  );
}
