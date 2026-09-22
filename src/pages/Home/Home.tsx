import { Box, Button } from '@/shared/ui';
import { useState } from 'react';

export function Home() {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex flex-col items-start gap-4">
      <Button title="Click" onClick={() => setVisible((prev) => !prev)} />
      {visible && <Box text="Box" width={250} height={200} background="#f9aac2" />}
    </div>
  );
}
