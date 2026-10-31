import { AiFillHome } from 'react-icons/ai';
import { PAGES } from '@/shared/config';
import { FaReact } from 'react-icons/fa6';

export interface IMenuBar {
  href: string;
  title: string;
  icon: React.ReactNode;
}

export const MENU: IMenuBar[] = [
  { title: 'Home', href: PAGES.HOME, icon: <AiFillHome size={22} /> },
  { title: 'React Query', href: PAGES.REACT_QUERY, icon: <FaReact size={22} /> },
];
