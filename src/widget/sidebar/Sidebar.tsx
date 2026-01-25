import { CiSettings } from "react-icons/ci";
import { AiFillFileText, AiFillHome } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { ModalAuth } from "@/features/ModalAuth/ModalAuth";
import { useState } from "react";
import { Avatar } from "@/shared/ui/Avatar";
import { useAuth } from "@/contexts/AuthContext";
import { RiAdminFill, RiUser2Fill } from "react-icons/ri";

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
        <li>
          <NavLink
            to="/typescript"
            className={({ isActive }) => (isActive ? " text-red-600" : "")}
          >
            <AiFillFileText className="text-3xl" />
          </NavLink>
        </li>
      </ul>
      <div className="flex flex-col gap-4">
        {user?.role === "admin" && (
          <>
            {user?.email === "frontenddev747@gmail.com" && (
              <NavLink
                to="/users"
                className={({ isActive }) => (isActive ? " text-red-600" : "")}
              >
                <RiUser2Fill className="text-3xl" />
              </NavLink>
            )}
            <NavLink
              to="/admin"
              className={({ isActive }) => (isActive ? " text-red-600" : "")}
            >
              <RiAdminFill className="text-3xl" />
            </NavLink>
          </>
        )}

        <NavLink
          to="/settings"
          className={({ isActive }) => (isActive ? " text-red-600" : "")}
        >
          <CiSettings className="text-3xl" />
        </NavLink>
      </div>

      {isOpen && <ModalAuth isOpen={isOpen} setIsOpen={setIsOpen} />}
    </aside>
  );
}
