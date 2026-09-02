import { Box } from '@/shared/ui';
import { useState } from 'react';

export function Home() {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div>
      <Box size={200} background="#ebef67" onClick={handleClick} />
    </div>
  );
}
