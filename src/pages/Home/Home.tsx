import { Card } from "@/shared/ui/Card";

import { CodeBlock } from "@/shared/ui/CodeBlock";

export default function Home() {
  return (
    <div>
      <Card
        avatar
        isOnline
        isErrorOnOff
        maxWidth="xl"
        title="Frontend"
        maxHeight={636}
      >
        <CodeBlock isBordered codeL="tsx" codeTitle="Frontend" />
      </Card>
    </div>
  );
}
