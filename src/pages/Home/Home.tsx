import { Badge, Button } from '@/shared/ui';
import { startTransition, useState, ViewTransition } from 'react';

export function Home() {
  const [click, setClick] = useState(false);

  const handleClick = () => {
    startTransition(() => {
      setClick(!click);
    });
  };

  const handleDelete = () => {
    startTransition(() => {
      setClick(false);
    });
  };

  return (
    <div className="flex items-center gap-5">
      <Button onClick={handleClick}>Click me</Button>
      {click && (
        <ViewTransition>
          <Badge text="Frontend" color="yellow" onDelete={handleDelete} />
        </ViewTransition>
      )}
    </div>
  );
}
