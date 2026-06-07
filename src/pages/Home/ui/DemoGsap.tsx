import { Box } from '@/shared/ui';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export function DemoGsap() {
  const root = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.sceneTo1',
        {
          width: 130,
          repeat: -1,
          yoyo: true,
          duration: 1.5,
          repeatDelay: 0.5,
          ease: 'power1.out',
          backgroundColor: '#014422',
        },
        {
          width: 300,
          repeat: -1,
          yoyo: true,
          duration: 2,
          repeatDelay: 0.5,
          ease: 'power1.out',
          backgroundColor: '#090f86',
        },
      );
    },
    { scope: root },
  );

  return (
    <Box ref={root} className="relative flex flex-col gap-10">
      <Box size={130} text="fromTo()" className="sceneTo1" />
    </Box>
  );
}
