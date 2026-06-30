import type { AnimationConfig } from '../types';

export const ANIMATIONS_CONFIG: AnimationConfig[] = [
  {
    selector: '.scene',
    method: 'from',
    vars: {
      width: 100,
      opacity: 0,
      scale: 0.5,
      duration: 1,
      ease: 'power2.inOut',
      stagger: {
        from: 'start',
        amount: 1,
      },
    },
  },
];
