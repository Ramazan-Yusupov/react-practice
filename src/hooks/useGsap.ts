import type { RefObject } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

type UseGsapParams = {
  root: RefObject<HTMLDivElement | null>;
  selector: string;
};

export function useGsap({ root, selector }: UseGsapParams) {
  useGSAP(
    () => {
      gsap.fromTo(
        selector,
        {
          opacity: 0,
          scale: 0.5,
          duration: 1,
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true,
          stagger: {
            from: 'center',
            amount: 0.5,
            grid: [3, 3],
          },
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true,
          stagger: {
            from: 'center',
            amount: 0.5,
            grid: [3, 3],
          },
        },
      );
    },
    { scope: root },
  );
}
