import { Button } from '@/shared/components/ui/button';
import { Badge, Box, Card } from '@/shared/ui';
import { useState } from 'react';

export function Home() {
  const [isOpen, setIsOpen] = useState(false);
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

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Card classNameChild="grid grid-cols-4" border="2px" maxWidth="2xl">
        {items.map((item) => (
          <Badge key={item.id} text={item.text} color="white" />
        ))}
        <Button onClick={() => handleClick()}>Open</Button>
        {isOpen && <Box size={100} background="#797e9f" />}
      </Card>
    </>
  );
}
