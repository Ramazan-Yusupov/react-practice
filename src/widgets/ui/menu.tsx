import { GridFourIcon } from '@phosphor-icons/react';
import { PAGES } from '../../shared/config/pages.config';
import { AiFillHome } from 'react-icons/ai';

export interface IMenuBar {
  href: string;
  title: string;
  icon: React.ReactNode;
}

export const MENU = [
  {
    title: 'Home',
    href: PAGES.HOME,
    icon: <AiFillHome size={22} />,
  },
  {
    title: 'Practice',
    href: PAGES.PRACTICE,
    icon: <GridFourIcon size={22} />,
  },
];
