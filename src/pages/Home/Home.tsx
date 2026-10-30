import { Card, CodeBlock } from '@/shared/ui';

const code = [
  {
    id: 1,
    codeL: 'tsx',
    badge: 'users',
    title: 'Home.tsx',
  },
  {
    id: 2,
    codeL: 'tsx',
    badge: 'admin',
    title: 'Page.tsx',
  },
];

export function Home() {
  return (
    <Card title="List" border="2px" maxWidth="2xl">
      {code.map((item) => (
        <CodeBlock key={item.id} title={item.title} badge={item.badge} codeL={item.codeL} />
      ))}
    </Card>
  );
}
