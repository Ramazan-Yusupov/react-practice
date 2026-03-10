import { Card } from "@/shared/ui/Cards/Card";
import { CodeBlock } from "@/shared/ui/Cards/CodeBlock";

export function Home() {
  return (
    <Card border="2px" maxWidth="xl" maxHeight="360px">
      <CodeBlock border="3px" codeTitle="Frontend Developer" codeL="tsx" />
    </Card>
  );
}
