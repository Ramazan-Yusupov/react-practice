import { Box, Button } from '@/shared/ui';
import { useState, ViewTransition, startTransition } from 'react';

export function Home() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <div className="flex flex-col items-start gap-4">
        <Button title="Click" onClick={() => startTransition(() => setVisible((prev) => !prev))} />
        {visible && (
          <ViewTransition>
            <Box text="Box" width={250} height={200} background="#f9aac2" />
          </ViewTransition>
        )}
      </div>
    </>
  );
}
