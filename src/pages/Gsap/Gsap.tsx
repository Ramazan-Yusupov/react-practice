import { useRef } from 'react';
import { Box } from '@/shared/ui';
import { ANIMATIONS_CONFIG, createBoxItem, useGsap } from '@/shared/gsap-config';

export function Gsap() {
  const root = useRef<HTMLDivElement | null>(null);

  useGsap({
    root,
    animations: ANIMATIONS_CONFIG,
  });

  const boxes = Array.from({ length: 6 }, (_, index) => createBoxItem(index + 1));

  return (
    <Box ref={root} className="flex flex-col items-start gap-10 ms-50">
      {boxes.map((item) => (
        <Box
          width={300}
          height={50}
          key={item.id}
          text={item.text}
          className="scene"
          background={item.background}
        />
      ))}
    </Box>
  );
}
