import { TbBrandZulip } from "react-icons/tb";
import { DiJsBadge } from "react-icons/di";
import { CiSettings } from "react-icons/ci";
import { AiFillHome } from "react-icons/ai";
import { NavLink } from "react-router-dom";

export function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 h-screen border-r-2 p-5 flex flex-col items-center justify-between gap-10 z-10">
      <ul className="flex flex-col items-center gap-6 w-full">
        <li>
          <NavLink to="/">
            <img
              src="/frontend.jpg"
              alt="Avatar"
              className="w-12 h-12 rounded-full border-2 cursor-pointer"
            />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? " text-red-600" : "")}
          >
            <AiFillHome className="text-3xl" />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/jspage"
            className={({ isActive }) => (isActive ? " text-[#f7f00f]" : "")}
          >
            <DiJsBadge className="text-3xl" />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/zustandpage"
            className={({ isActive }) => (isActive ? " text-[#056d0b]" : "")}
          >
            <TbBrandZulip className="text-3xl" />
          </NavLink>
        </li>
      </ul>
      <NavLink
        to="/settings"
        className={({ isActive }) => (isActive ? " text-red-600" : "")}
      >
        <CiSettings className="text-3xl" />
      </NavLink>
    </aside>
  );
}
