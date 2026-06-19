import { useRef } from 'react';
import { Box } from '@/shared/ui';
import { ANIMATIONS_CONFIG, createBoxItem, useGsap } from '@/shared/gsap-config';

export function Gsap() {
  const root = useRef<HTMLDivElement | null>(null);

  useGsap({
    root,
    animations: ANIMATIONS_CONFIG,
  });

  const boxes = Array.from({ length: 1 }, (_, index) => createBoxItem(index + 1));

  return (
    <Box ref={root} className="flex flex-col justify-start gap-10">
      {boxes.map((item) => (
        <Box
          size={150}
          key={item.id}
          text={item.text}
          className="scene"
          background={item.background}
        />
      ))}
      {boxes.map((item) => (
        <Box
          size={150}
          key={item.id}
          text={item.text}
          className="scene2"
          background={item.background}
        />
      ))}
    </Box>
  );
}
