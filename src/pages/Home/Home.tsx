import { Badge, Button } from '@/shared/ui';
import { startTransition, useState, ViewTransition } from 'react';

export function Home() {
  const [click, setClick] = useState(false);

  return (
    <div className="flex items-center gap-5">
      <Button onClick={() => startTransition(() => setClick(!click))}>Click me</Button>
      {click && (
        <ViewTransition>
          <Badge
            text="Frontend"
            color="yellow"
            onDelete={() => startTransition(() => setClick(false))}
          />
        </ViewTransition>
      )}
    </div>
  );
}
