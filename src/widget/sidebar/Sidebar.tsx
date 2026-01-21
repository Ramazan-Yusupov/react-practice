import { CiSettings } from "react-icons/ci";
import { AiFillHome } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { ModalAuth } from "@/features/ModalAuth/ModalAuth";
import { useState } from "react";
import { Avatar } from "@/shared/ui/Avatar";
import { useAuth } from "@/contexts/AuthContext";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();

  return (
    <aside className="fixed top-0 left-0 h-screen p-5 flex flex-col items-center justify-between gap-10 z-10">
      <ul className="flex flex-col items-center gap-6 w-full">
        <li>
          {isAuthenticated && user ? (
            <Avatar
              img={user.avatar}
              avatarSeed={user.avatarSeed}
              onClick={() => setIsOpen(true)}
            />
          ) : (
            <Avatar isAnonymous onClick={() => setIsOpen(true)} />
          )}
        </li>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? " text-red-600" : "")}
          >
            <AiFillHome className="text-3xl" />
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
