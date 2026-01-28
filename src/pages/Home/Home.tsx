import { Card } from "@/components/Card";
import { CodeBlock } from "@/components/CodeBlock";
import { InterfaceType } from "./ui/InterfaceType";
import { Input } from "@/shared/ui/Input";
import { itemsMock } from "@/mockApi/itemsMock";

export default function Home() {
  const affProducts = itemsMock.filter(
    (product) => product.color === "white" || product.price < 500,
  );

  return (
    <div>
      <Card
        avatar
        isOnline
        isErrorOnOff
        maxWidth="xl"
        title="Frontend"
        maxHeight={360}
      >
        <Input placeholder="Search" />
        <InterfaceType />
        {affProducts.map((product) => (
          <CodeBlock
            isBordered
            key={product.name}
            colorR={product.color === "black" ? "red" : "green"}
            colorL={product.price < 500 ? "yellow" : "green"}
            codeL={product.price}
            codeR={product.color}
            codeTitle={product.name}
          />
        ))}
      </Card>
    </div>
  );
}
