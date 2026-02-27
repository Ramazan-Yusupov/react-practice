import { PAGES } from "../../config/pages.config";
import { AiFillFileText, AiFillHome } from "react-icons/ai";

export interface IMenuBar {
  href: string;
  icon: React.ReactNode;
}

export const MENU = [
  {
    href: PAGES.BLOCKCODE,
    icon: <AiFillFileText size={22} />,
  },
  {
    href: PAGES.HOME,
    icon: <AiFillHome size={22} />,
  },
];
