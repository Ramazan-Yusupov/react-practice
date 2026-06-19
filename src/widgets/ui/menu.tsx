import { PAGES } from '../../shared/config/pages.config';
import { AiFillHome } from 'react-icons/ai';

export interface IMenuBar {
  href: string;
  title: string;
  icon: React.ReactNode;
}

export const MENU = [
  {
    title: 'Gsap',
    href: PAGES.GSAP,
    icon: <AiFillHome size={22} />,
  },
];
