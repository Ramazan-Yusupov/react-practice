import { FaReact } from 'react-icons/fa6';
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
    title: 'Course React',
    href: PAGES.COURSE_REACT,
    icon: <FaReact size={22} />,
  },
];
