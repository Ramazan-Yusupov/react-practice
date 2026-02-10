import { Card } from "@/shared/ui/Card";
import { CodeBlock } from "@/shared/ui/CodeBlock";

export default function Home() {
  return (
    <div>
      <Card
        avatar
        isOnline
        isErrorOnOff
        maxWidth="lg"
        maxHeight={370}
        title="Frontend"
      >
        <CodeBlock
          isBordered
          codeR="tsx"
          codeL="React"
          codeTitle="Frontend Developer"
        />
      </Card>
    </div>
  );
}
