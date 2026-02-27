import { Link } from "react-router-dom";
import type { IMenuBar } from "./menu";

interface MenuBarProps {
  menuBar: IMenuBar;
  isActive: boolean;
  className?: string;
}

export function MenuBar({ menuBar, isActive, className }: MenuBarProps) {
  return (
    <Link
      to={menuBar.href}
      className={`${isActive ? "text-red-500" : ""} ${className || ""}`}
    >
      {menuBar.icon}
    </Link>
  );
}
