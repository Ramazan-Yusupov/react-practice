import { Card, CodeBlock } from '@/shared/ui';

const code = [
  {
    id: 1,
    title: 'Home.tsx',
    codeL: 'tsx',
  },
  {
    id: 2,
    title: 'Home.tsx',
    codeL: 'tsx',
  },
  {
    id: 3,
    title: 'Home.tsx',
    codeL: 'tsx',
  },
  {
    id: 4,
    title: 'Home.tsx',
    codeL: 'tsx',
  },
];

export function Home() {
  return (
    <Card title="List" border="2px" maxWidth="2xl">
      {code.map((item) => (
        <CodeBlock key={item.id} title={item.title} badge={item.title} codeL={item.codeL} />
      ))}
    </Card>
  );
}
