import { Card, CodeBlock } from '@/shared/ui';

const code = [
  {
    id: 1,
    title: 'Home.tsx',
    codeL: 'tsx',
    codeR: 'codeR',
  },
  {
    id: 2,
    title: 'Home.tsx',
    codeL: 'tsx',
    codeR: 'codeR',
  },
  {
    id: 3,
    title: 'Home.tsx',
    codeL: 'tsx',
    codeR: 'codeR',
  },
  {
    id: 4,
    title: 'Home.tsx',
    codeL: 'tsx',
    codeR: 'codeR',
  },
];

export function Home() {
  return (
    <Card title="List" border="2px" maxWidth="2xl">
      {code.map((item) => (
        <CodeBlock key={item.id} {...item} />
      ))}
    </Card>
  );
}
