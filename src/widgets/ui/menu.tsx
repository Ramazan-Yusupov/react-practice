import { AiFillHome, AiOutlineUser } from 'react-icons/ai';
import { PAGES } from '@/shared/config';

export interface IMenuBar {
  href: string;
  title: string;
  icon: React.ReactNode;
}

export const MENU: IMenuBar[] = [
  { title: 'Home', href: PAGES.HOME, icon: <AiFillHome size={22} /> },
  { title: 'Profile', href: PAGES.PROFILE, icon: <AiOutlineUser size={22} /> },
];
