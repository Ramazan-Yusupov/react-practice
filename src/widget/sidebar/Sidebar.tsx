import { GiHook } from "react-icons/gi";
import { AiFillAppstore } from "react-icons/ai";
import { CgTrello } from "react-icons/cg";
import { TbBrandZulip } from "react-icons/tb";
import { DiJsBadge } from "react-icons/di";
import { CiSettings } from "react-icons/ci";
import { AiFillHome } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { ModalAuth } from "@/features/ModalAuth/ModalAuth";
import { useState } from "react";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <aside className="fixed top-0 left-0 h-screen p-5 flex flex-col items-center justify-between gap-10 z-10">
      <ul className="flex flex-col items-center gap-6 w-full">
        <li>
          <button onClick={() => setIsOpen(true)}>
            <img
              src="/frontend.jpg"
              alt="Avatar"
              className="w-12 h-12 rounded-full border-2 cursor-pointer"
            />
          </button>
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
            to="/zustandpage/todo"
            className={({ isActive }) => (isActive ? " text-[#056d0b]" : "")}
          >
            <TbBrandZulip className="text-3xl" />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/zustandpage/board"
            className={({ isActive }) => (isActive ? " text-[#056d0b]" : "")}
          >
            <CgTrello className="text-3xl" />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/zustandpage/application"
            className={({ isActive }) => (isActive ? " text-[#056d0b]" : "")}
          >
            <AiFillAppstore className="text-3xl" />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/hookspage"
            className={({ isActive }) => (isActive ? " text-[#1449bc]" : "")}
          >
            <GiHook className="text-3xl" />
          </NavLink>
        </li>
      </ul>
      <NavLink
        to="/settings"
        className={({ isActive }) => (isActive ? " text-red-600" : "")}
      >
        <CiSettings className="text-3xl" />
      </NavLink>

      {isOpen && <ModalAuth isOpen={isOpen} setIsOpen={setIsOpen} />}
    </aside>
  );
}
