import { Card } from "@/shared/ui/Cards/Card";
import { CodeBlock } from "@/shared/ui/Cards/CodeBlock";

export function Home() {
  return (
    <Card border={2} maxWidth="xl">
      <CodeBlock border={3} codeTitle="Frontend" codeL="tsx" />
    </Card>
  );
}
