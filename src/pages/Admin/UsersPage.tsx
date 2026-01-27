import { useAuth, type User } from "@/contexts/AuthContext";
import { useState, useEffect, useMemo } from "react";
import { Avatar } from "@/shared/ui/Avatar";
import { SortDropdown } from "@/shared/ui/SortDropdown";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AdminTable } from "@/shared/ui/AdminTable";

export function UsersPage() {
  const { getAllUsers, deleteUser, user: currentUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [sortMode, setSortMode] = useState("default");

  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => {
      // 1. Super Admin always first
      if (a.email === "frontenddev747@gmail.com") return -1;
      if (b.email === "frontenddev747@gmail.com") return 1;

      // 2. Sort by selected mode
      if (sortMode === "admin") {
        if (a.role === "admin" && b.role !== "admin") return -1;
        if (a.role !== "admin" && b.role === "admin") return 1;
      } else if (sortMode === "user") {
        if (a.role === "user" && b.role !== "user") return -1;
        if (a.role !== "user" && b.role === "user") return 1;
      }

      return 0;
    });
  }, [users, sortMode]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getAllUsers();
      setUsers(data);
    };
    fetchUsers();
  }, [getAllUsers]);

  // Only super admin can see this page (extra safety)
  if (currentUser?.email !== "frontenddev747@gmail.com") {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <h1 className="text-2xl font-bold text-red-500">Доступ запрещен</h1>
      </div>
    );
  }

  return (
    <div className="max-w-350 mx-auto py-10">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter italic">
            История <span className="text-red-600">регистрации</span>
          </h1>
          <p className="text-gray-400">Управление пользователями и данными</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-gray-800/50 border border-gray-700 rounded-2xl px-6 py-3">
            <span className="text-gray-400 text-sm">Всего пользователей: </span>
            <span className="text-white font-bold">{users.length}</span>
          </div>
          <SortDropdown
            onSort={setSortMode}
            currentSort={sortMode}
            options={[
              { value: "admin", label: "Admin" },
              { value: "user", label: "User" },
              { value: "default", label: "Сбросить" },
            ]}
          />
        </div>
      </div>

      <AdminTable
        headers={["Аватар", "Nickname", "Имя", "Email", "Роль", "Действие"]}
      >
        {sortedUsers.map((user) => (
          <tr
            key={user.id}
            className="border-b border-gray-800/50 hover:bg-white/5 transition-all duration-300"
          >
            <td className="py-5 px-6">
              <Avatar
                img={user.avatar}
                avatarSeed={user.avatarSeed}
                size="sm"
              />
            </td>
            <td className="py-5 px-6">
              <span className="text-white font-bold font-mono text-sm">
                @{user.username}
              </span>
            </td>
            <td className="py-5 px-6">
              <span className="text-gray-300">{user.name}</span>
            </td>
            <td className="py-5 px-6">
              <span className="text-gray-400 font-mono text-xs">
                {user.email}
              </span>
            </td>

            <td className="py-5 px-6">
              <span
                className={`
                px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter
                ${
                  user.role === "admin"
                    ? "bg-red-500/10 text-red-500 border border-red-500/20"
                    : "bg-blue-500/10 text-blue-500 border border-blue-500/20"
                }
              `}
              >
                {user.role}
              </span>
            </td>
            <td className="py-5 px-6">
              {currentUser?.id !== user.id && (
                <button
                  onClick={async () => {
                    if (
                      window.confirm(
                        `Вы уверены, что хотите навсегда удалить пользователя @${user.username}? Это действие необратимо.`,
                      )
                    ) {
                      await deleteUser(user.id);
                      const updatedUsers = await getAllUsers();
                      setUsers(updatedUsers);
                    }
                  }}
                  className="bg-red-600 hover:bg-gray-800 hover:text-red-500 p-2 rounded-xl border border-gray-700 hover:border-red-500/50 transition-all duration-200"
                  title="Удалить пользователя"
                >
                  <RiDeleteBin6Line size={16} />
                </button>
              )}
            </td>
          </tr>
        ))}
      </AdminTable>
    </div>
  );
}
