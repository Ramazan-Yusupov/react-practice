import { useAuth, type User } from "@/Folders/contexts/AuthContext";
import { Button } from "@/shared/ui/Button";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AdminHistoryTable } from "./AdminHistoryTable";
import { Avatar } from "@/shared/ui/Avatar";
import { AdminTable } from "@/shared/ui/AdminTable";
import { RiDeleteBin6Line } from "react-icons/ri";
import { SortDropdown } from "@/shared/ui/SortDropdown";
import { useMemo } from "react";

export function AdminPage() {
  const {
    user,
    adminRequests,
    handleAdminRequest,
    deleteAdminRequest,
    changeUserRole,
    isAuthenticated,
    getAllUsers,
  } = useAuth();
  const [usersMap, setUsersMap] = useState<Record<string, User>>({});
  const [, setTick] = useState(0); // For forcing re-render
  const [historySortMode, setHistorySortMode] = useState("default");

  const roleOptions = [
    { id: "user", label: "User", value: "user" },
    { id: "admin", label: "Admin", value: "admin" },
  ];

  const isSuperAdmin = user?.email === "frontenddev747@gmail.com";

  const processedRequests = useMemo(() => {
    let requests = adminRequests.filter((req) => req.status !== "pending");

    // Filter by status
    if (historySortMode === "approved") {
      requests = requests.filter((req) => req.status === "approved");
    } else if (historySortMode === "rejected") {
      requests = requests.filter((req) => req.status === "rejected");
    }

    // Default sort by date (newest first)
    return requests.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA;
    });
  }, [adminRequests, historySortMode]);

  // Загружаем пользователей для отображения аватарок и имен
  useEffect(() => {
    const loadUsers = async () => {
      const users = await getAllUsers();
      const map: Record<string, User> = {};
      users.forEach((u) => {
        map[u.id] = u;
      });
      setUsersMap(map);
    };
    loadUsers();
  }, [getAllUsers, adminRequests]); // Обновляем при изменении заявок

  // Защита роута
  if (!isAuthenticated || user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  const pendingRequests = adminRequests.filter(
    (req) => req.status === "pending",
  );

  return (
    <div className="max-w-360 mx-auto py-10 px-8">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter italic">
            Панель <span className="text-red-600">управления</span>
          </h1>
          <p className="text-gray-400">
            Управление запросами и ролями пользователей
          </p>
        </div>
        <div className="bg-gray-800/50 border border-gray-700 rounded-2xl px-6 py-3">
          <span className="text-gray-400 text-sm">Активных запросов: </span>
          <span className="text-white font-bold">{pendingRequests.length}</span>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-6 text-gray-400">
          Новые запросы ({pendingRequests.length})
        </h2>
        <AdminTable
          headers={[
            "Аватар",
            "Пользователь",
            "Email",
            "Сообщение",
            "Дата",
            "Действия",
          ]}
        >
          {pendingRequests.length === 0 ? (
            <tr>
              <td colSpan={6} className="py-8 text-center text-gray-500">
                Нет новых запросов
              </td>
            </tr>
          ) : (
            pendingRequests.map((req) => {
              const currentUser = usersMap[req.userId];

              return (
                <tr
                  key={req.id}
                  className="border-b border-gray-800/50 hover:bg-white/5 transition-all duration-300"
                >
                  <td className="py-5 px-6">
                    <Avatar
                      img={currentUser?.avatar}
                      avatarSeed={currentUser?.avatarSeed}
                      size="sm"
                    />
                  </td>
                  <td className="py-5 px-6">
                    <span className="text-white font-bold font-mono text-sm">
                      @{req.username}
                    </span>
                  </td>
                  <td className="py-5 px-6">
                    <span className="text-gray-400 font-mono text-xs">
                      {req.email}
                    </span>
                  </td>
                  <td className="py-5 px-6">
                    <p
                      className="text-gray-300 text-sm italic max-w-xs truncate"
                      title={req.message}
                    >
                      "{req.message}"
                    </p>
                  </td>
                  <td className="py-5 px-6 text-gray-500 text-xs font-mono">
                    {new Date(req.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex gap-2">
                      <>
                        <Button
                          onClick={() => handleAdminRequest(req.id, "approved")}
                          variant="primary"
                          className="bg-green-600/10 hover:bg-green-600 text-green-500 hover:text-white border-green-600/20 text-[10px] font-black uppercase px-3 py-1"
                        >
                          Одобрить
                        </Button>
                        <Button
                          onClick={() => handleAdminRequest(req.id, "rejected")}
                          variant="secondary"
                          className="bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white border-red-600/20 text-[10px] font-black uppercase px-3 py-1"
                        >
                          Отклонить
                        </Button>
                        {isSuperAdmin && (
                          <button
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Вы уверены, что хотите удалить этот запрос?",
                                )
                              ) {
                                deleteAdminRequest(req.id);
                              }
                            }}
                            className="bg-gray-800 hover:bg-red-600/20 text-gray-500 hover:text-red-500 p-2 rounded-xl border border-gray-700 hover:border-red-500/50 transition-all duration-200"
                            title="Удалить запрос"
                          >
                            <RiDeleteBin6Line size={16} />
                          </button>
                        )}
                      </>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </AdminTable>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-400">
            История запросов
          </h2>
          <SortDropdown
            onSort={setHistorySortMode}
            currentSort={historySortMode}
            options={[
              { value: "approved", label: "Одобрено" },
              { value: "rejected", label: "Отклонено" },
              { value: "default", label: "Сбросить" },
            ]}
          />
        </div>
        <div className="overflow-x-auto scrollHidden">
          <AdminHistoryTable
            requests={processedRequests}
            isSuperAdmin={isSuperAdmin}
            roleOptions={roleOptions}
            onChangeRole={changeUserRole}
            onRefresh={() => setTick((t) => t + 1)}
            usersMap={usersMap}
          />
        </div>
      </section>
    </div>
  );
}
