import { Card } from "@/components/Card";
import { CodeBlock } from "@/components/CodeBlock";
import { InterfaceType } from "./ui/InterfaceType";

export default function Home() {
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
        <CodeBlock codeTitle="Frontend" code="Frontend" isBordered />
        <InterfaceType />
      </Card>
    </div>
  );
}
