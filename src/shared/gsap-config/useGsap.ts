import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import type { BoxItem } from '../types';
import type { UseGsapParams } from '../types/types';

export function createBoxItem(id: number): BoxItem {
  const background = `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;

  return {
    id,
    text: 'stagger',
    background,
  };
}

export const GSAP_PRESETS = {
  infinite: {
    repeat: -1,
    yoyo: true,
  },
  smoothEase: {
    ease: 'power3.out',
  },
  scrollReveal: {
    once: true,
    start: 'top 80%',
  },
} as const;

export function useGsap({ root, animations }: UseGsapParams) {
  useGSAP(
    () => {
      animations.forEach(({ selector, method = 'to', vars, fromVars }) => {
        if (method === 'fromTo' && fromVars) {
          gsap.fromTo(selector, fromVars, vars);
        } else if (method === 'from') {
          gsap.from(selector, vars);
        } else {
          gsap.to(selector, vars);
        }
      });
    },
    { scope: root, dependencies: [animations] },
  );
}
