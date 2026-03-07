import { PAGES } from "../../config/pages.config";
import { AiFillFileText, AiFillHome } from "react-icons/ai";

export interface IMenuBar {
  href: string;
  title: string;
  icon: React.ReactNode;
}

export const MENU = [
  {
    title: "Block Code",
    href: PAGES.BLOCKCODE,
    icon: <AiFillFileText size={22} />,
  },
  {
    title: "Home",
    href: PAGES.HOME,
    icon: <AiFillHome size={22} />,
  },
];
