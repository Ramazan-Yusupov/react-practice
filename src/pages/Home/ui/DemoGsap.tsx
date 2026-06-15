import { useGSAP } from '@gsap/react';
import { Box } from '@/shared/ui';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { createBoxItem } from '@/shared/utils/utils';
import { useGsap } from '@/hooks/useGsap';

gsap.registerPlugin(useGSAP);

export function DemoGsap() {
  const root = useRef<HTMLDivElement | null>(null);

  useGsap({
    root,
    selector: '.scene',
  });

  const boxes = Array.from({ length: 9 }, (_, index) => createBoxItem(index + 1));

  return (
    <Box ref={root} className="grid grid-cols-3 gap-10">
      {boxes.map((item) => (
        <Box
          size={150}
          key={item.id}
          text={item.text}
          className="scene"
          background={item.background}
        />
      ))}
    </Box>
  );
}
