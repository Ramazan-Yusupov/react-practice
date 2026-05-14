import { Card, CodeBlock } from "@/shared/ui";

export function Home() {
  return (
    <Card maxWidth="2xl" border="2px">
      <CodeBlock
        border="1px"
        title="Hello World"
        codeL="console.log('Frontend')"
      />
    </Card>
  );
}
