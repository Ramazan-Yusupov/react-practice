import { Show, UserButton } from '@clerk/react';
import { Link } from 'react-router-dom';
import { PAGES } from '@/shared/config';
import { MENU } from './ui/menu';
import { MenuBar } from './ui/MenuBar';

export function Header() {
  return (
    <aside className="fixed top-0 right-0 p-4 z-10">
      <ul className="flex items-center gap-5 border border-gray-600 rounded-full ps-5 pe-4 py-1">
        {MENU.map((menuBar) => (
          <li key={menuBar.href}>
            <MenuBar menuBar={menuBar} />
          </li>
        ))}
        <li className="flex items-center">
          <Show when="signed-in">
            <UserButton />
          </Show>
        </li>
        <Show when="signed-out">
          <li className="flex items-center gap-4 pe-4 text-sm">
            <Link to={PAGES.SIGN_IN} className="hover:underline">
              Войти
            </Link>
            <Link to={PAGES.SIGN_UP} className="hover:underline">
              Регистрация
            </Link>
          </li>
        </Show>
      </ul>
    </aside>
  );
}
