import { Avatar } from '../shared/ui/Avatar/Avatar';
import { MENU } from './ui/menu';
import { MenuBar } from './ui/MenuBar';

export function Header() {
  return (
    <aside className="fixed top-0 right-0 p-4 z-10">
      <ul className="flex items-center gap-5 border border-gray-600 rounded-full ps-5 pe-1 py-1">
        {MENU.map((menuBar) => (
          <li key={menuBar.href}>
            <MenuBar menuBar={menuBar} />
          </li>
        ))}
        <li>
          <Avatar src="/frontend.jpg" size="md" />
        </li>
      </ul>
    </aside>
  );
}
