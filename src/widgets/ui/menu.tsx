import { PAGES } from "../../config/pages.config";
import { AiFillHome } from "react-icons/ai";

export interface IMenuBar {
  href: string;
  title: string;
  icon: React.ReactNode;
}

export const MENU = [
  {
    title: "Home",
    href: PAGES.HOME,
    icon: <AiFillHome size={22} />,
  },
];
