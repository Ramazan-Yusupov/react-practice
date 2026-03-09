import { Card } from "../../shared/ui/Cards/Card";
import { CodeBlock } from "../../shared/ui/Cards/CodeBlock";

export function BlockCode() {
  return (
    <Card border="2px" maxWidth="xl">
      <CodeBlock border="2px" codeTitle="Frontend - BlockCode" codeL="tsx" />
    </Card>
  );
}
