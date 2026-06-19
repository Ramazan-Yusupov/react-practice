import type { RefObject } from 'react';

export type BoxItem = {
  id: number;
  text: string;
  background: string;
};

export type GsapMethod = 'to' | 'from' | 'fromTo';

export type AnimationConfig = {
  selector: string;
  method?: GsapMethod;
  vars: gsap.TweenVars;
  fromVars?: gsap.TweenVars;
};

export type UseGsapParams = {
  root: RefObject<HTMLElement | null>;
  animations: AnimationConfig[];
};
