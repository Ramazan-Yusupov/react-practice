import { Card } from "@/components/Card";
import { CodeBlock } from "@/components/CodeBlock";

export default function Home() {
  return (
    <div>
      <Card avatar isOnline isErrorOnOff maxWidth="xl" title="Frontend">
        <CodeBlock
          codeTitle="Frontend"
          code="React, Next, TypeScript, JavaScript"
          isBordered
        />
      </Card>
    </div>
  );
}
