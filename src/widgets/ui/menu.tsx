import { RiPassValidFill } from 'react-icons/ri';
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
  {
    title: 'Hook Form',
    href: PAGES.HOOK_FORM,
    icon: <RiPassValidFill size={22} />,
  },
];
