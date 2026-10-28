import { Card, CodeBlock } from '@/shared/ui';

const code = {
  title: 'Frontend',
  codeL: 'tsx',
};

export function Home() {
  return (
    <Card title="Frontend" border="2px" maxWidth="2xl">
      <CodeBlock {...code} />
    </Card>
  );
}
