import { AiFillHome } from 'react-icons/ai';
import { PAGES } from '@/shared/config';
import { FaReact } from 'react-icons/fa6';
import { SiTypescript } from 'react-icons/si';

export interface IMenuBar {
  href: string;
  title: string;
  icon: React.ReactNode;
}

export const MENU: IMenuBar[] = [
  { title: 'Home', href: PAGES.HOME, icon: <AiFillHome size={22} /> },
  { title: 'React Query', href: PAGES.REACT_QUERY, icon: <FaReact size={22} /> },
  { title: 'TypeScript', href: PAGES.TYPESCRIPT_PAGE, icon: <SiTypescript size={22} /> },
];
