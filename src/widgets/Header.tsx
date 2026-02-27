"use client";

import { Avatar } from "../shared/ui/Avatar/Avatar";
import { MENU } from "./ui/menu";
import { MenuBar } from "./ui/MenuBar";
import { match } from "path-to-regexp";
import { useLocation } from "react-router-dom";

export function Header() {
  const pathname = useLocation().pathname;

  return (
    <aside className="fixed top-0 right-0 p-4 z-10">
      <ul className="flex items-center gap-5 border border-gray-600 rounded-full ps-5 pe-1 py-1">
        {MENU.map((menuBar, index) => (
          <li key={index}>
            <MenuBar
              menuBar={menuBar}
              isActive={!!match(menuBar.href)(pathname)}
            />
          </li>
        ))}
        <li>
          <Avatar src="/frontend.jpg" size="md" />
        </li>
      </ul>
    </aside>
  );
}
