import { NavLink } from 'react-router-dom';
import type { IMenuBar } from './menu';

interface MenuBarProps {
  menuBar: IMenuBar;
  className?: string;
}

export function MenuBar({ menuBar, className }: MenuBarProps) {
  return (
    <NavLink
      to={menuBar.href}
      aria-label={menuBar.title}
      className={({ isActive }) => `${isActive ? 'text-red-500' : ''} ${className || ''}`}
    >
      {menuBar.icon}
    </NavLink>
  );
}
