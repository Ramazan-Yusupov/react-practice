import { RiPassValidFill } from 'react-icons/ri';
import { PAGES } from '../../shared/config/pages.config';
import { AiFillHome } from 'react-icons/ai';
import { FaJs } from 'react-icons/fa6';
import { PiWaveSineBold } from 'react-icons/pi';
import { FiBookOpen, FiDroplet, FiGitBranch, FiSend, FiTarget } from 'react-icons/fi';

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
  {
    title: 'Js Practice',
    href: PAGES.JS_PRACTICE,
    icon: <FaJs size={22} />,
  },
  {
    title: 'Scroll Choreography',
    href: PAGES.SCROLL_CHOREOGRAPHY,
    icon: <PiWaveSineBold size={22} />,
  },
  {
    title: 'Async Inbox',
    href: PAGES.ASYNC_INBOX,
    icon: <FiSend size={22} />,
  },
  {
    title: 'Focus Deck',
    href: PAGES.FOCUS_DECK,
    icon: <FiTarget size={22} />,
  },
  {
    title: 'Palette Sniper',
    href: PAGES.PALETTE_SNIPER,
    icon: <FiDroplet size={22} />,
  },
  {
    title: 'Route Morphing',
    href: PAGES.ROUTE_MORPHING,
    icon: <FiGitBranch size={22} />,
  },
  {
    title: 'Local Code Notebook',
    href: PAGES.LOCAL_CODE_NOTEBOOK,
    icon: <FiBookOpen size={22} />,
  },
];
