import { CONFIG } from '@/shared/config';
import { Card, CodeBlock } from '@/shared/ui';

export function Home() {
  return (
    <Card title={CONFIG.card.title} border="2px" maxWidth="2xl">
      <CodeBlock title="Frontend" codeL="tsx" />
    </Card>
  );
}
