import { NavLink } from "react-router-dom";
import type { IMenuBar } from "./menu";
import { cn } from "@/lib";

interface MenuBarProps {
  menuBar: IMenuBar;
  className?: string;
}

export function MenuBar({ menuBar, className }: MenuBarProps) {
  return (
    <NavLink
      to={menuBar.href}
      aria-label={menuBar.title}
      className={({ isActive }) =>
        cn(
          "p-3 rounded-lg text-gray-400 hover:text-white transition-colors",
          isActive ? "text-white bg-gray-700" : "",
          className,
        )
      }
    >
      {menuBar.icon}
    </NavLink>
  );
}
