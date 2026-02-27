import { Card } from "../../shared/ui/Cards/Card";
import { CodeBlock } from "../../shared/ui/Cards/CodeBlock";

export function BlockCode() {
  return (
    <Card border={2} maxWidth="xl">
      <CodeBlock border={2} codeTitle="Frontend - BlockCode" codeL="tsx" />
    </Card>
  );
}
