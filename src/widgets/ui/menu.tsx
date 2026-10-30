import { AiFillHome } from 'react-icons/ai';
import { PAGES } from '@/shared/config';

export interface IMenuBar {
  href: string;
  title: string;
  icon: React.ReactNode;
}

export const MENU: IMenuBar[] = [
  { title: 'Home', href: PAGES.HOME, icon: <AiFillHome size={22} /> },
];
