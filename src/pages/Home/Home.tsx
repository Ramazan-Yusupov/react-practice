import { Card } from "@/shared/ui/Cards/Card";
import { CodeBlock } from "@/shared/ui/Cards/CodeBlock";
import { ProductCard } from "@/shared/ui/Cards/ProductCard";

export function Home() {
  const items = [
    {
      id: 1,
      title: "Frontend Course",
      price: 99.99,
      isAvailable: true,
    },
    {
      id: 2,
      title: "Backend Course",
      price: 149.99,
      isAvailable: false,
    },
    {
      id: 3,
      title: "Python Course",
      price: 199.99,
      isAvailable: true,
    },
  ];
  return (
    <Card border="2px" maxWidth="xl" maxHeight="500px">
      <CodeBlock border="3px" codeTitle="Frontend" codeL="tsx" />
      {items.map((item) => (
        <ProductCard key={item.id} product={item} />
      ))}
    </Card>
  );
}
