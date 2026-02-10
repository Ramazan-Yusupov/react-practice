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
        title="Frontend"
        maxHeight={370}
      >
        <CodeBlock isBordered codeL="React" codeR="tsx" codeTitle="Frontend" />
      </Card>
    </div>
  );
}
