import type { AnimationConfig } from '../types/types';
import { GSAP_PRESETS } from './useGsap';

export const ANIMATIONS_CONFIG: AnimationConfig[] = [
  {
    selector: '.scene',
    method: 'to',
    vars: {
      ...GSAP_PRESETS.infinite,
      opacity: 0,
      scale: 0.5,
      duration: 1,
      ease: 'power2.inOut',
      stagger: {
        from: 'center',
        amount: 0.5,
      },
    },
  },
  {
    selector: '.scene2',
    method: 'fromTo',
    fromVars: {
      ...GSAP_PRESETS.infinite,
      x: -100,
      opacity: 0,
      ease: 'power2.inOut',
      stagger: {
        from: 'center',
        amount: 0.5,
      },
    },
    vars: {
      ...GSAP_PRESETS.infinite,
      x: 200,
      opacity: 1,
      duration: 1.2,
      ease: 'power2.inOut',
      stagger: {
        from: 'center',
        amount: 0.5,
      },
    },
  },
];
