import { Badge, Card } from '@/shared/ui';

export function Home() {
  const items = [
    {
      id: 1,
      text: 'Frontend',
    },
    {
      id: 2,
      text: 'Backend',
    },
    {
      id: 3,
      text: 'FullStack',
    },
    {
      id: 4,
      text: 'DevOps',
    },
    {
      id: 5,
      text: 'Manager',
    },
    {
      id: 6,
      text: 'React.js',
    },
    {
      id: 7,
      text: 'Next.js',
    },
    {
      id: 8,
      text: 'Tailwind',
    },
    {
      id: 9,
      text: 'TypeScript',
    },
    {
      id: 10,
      text: 'JavaScript',
    },
  ];
  return (
    <Card classNameChild="grid grid-cols-4" border="2px" maxWidth="2xl">
      {items.map((item) => (
        <Badge key={item.id} text={item.text} color="white" />
      ))}
    </Card>
  );
}
