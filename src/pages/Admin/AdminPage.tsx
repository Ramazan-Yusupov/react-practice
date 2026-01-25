import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/shared/ui/Button";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { Dropdown } from "@/shared/ui/Dropdown";

export function AdminPage() {
  const {
    user,
    adminRequests,
    handleAdminRequest,
    changeUserRole,
    isAuthenticated,
  } = useAuth();
  const [, setTick] = useState(0); // For forcing re-render

  const roleOptions = [
    { id: "user", label: "User", value: "user" },
    { id: "admin", label: "Admin", value: "admin" },
  ];

  // Защита роута
  if (!isAuthenticated || user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  const pendingRequests = adminRequests.filter(
    (req) => req.status === "pending",
  );
  const processedRequests = adminRequests.filter(
    (req) => req.status !== "pending",
  );

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-white">Панель управления</h1>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-6 text-gray-400">
          Новые запросы ({pendingRequests.length})
        </h2>
        {pendingRequests.length === 0 ? (
          <div className="bg-gray-800 border-2 border-dashed border-gray-700 rounded-xl p-8 text-center text-gray-500">
            Нет новых запросов
          </div>
        ) : (
          <div className="grid gap-4">
            {pendingRequests.map((req) => (
              <div
                key={req.id}
                className="bg-gray-800 border-2 border-gray-700 rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-bold text-lg text-white">
                      {req.username}
                    </span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-400">{req.email}</span>
                  </div>
                  <p className="text-gray-300 italic">"{req.message}"</p>
                  <div className="mt-2 text-xs text-gray-500">
                    {new Date(req.createdAt).toLocaleString()}
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={() => handleAdminRequest(req.id, "approved")}
                    variant="primary"
                    className="bg-green-600 hover:bg-green-700 border-none"
                  >
                    Одобрить
                  </Button>
                  <Button
                    onClick={() => handleAdminRequest(req.id, "rejected")}
                    variant="secondary"
                    className="bg-red-900/30 hover:bg-red-900/50 text-red-500 border-red-900/50"
                  >
                    Отклонить
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-6 text-gray-400">
          История запросов
        </h2>
        <div className="overflow-x-auto scrollHidden">
          <table className="w-full text-left border-collapse mb-30">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-4 px-4 text-gray-500 font-medium">
                  Пользователь
                </th>
                <th className="py-4 px-4 text-gray-500 font-medium">Email</th>
                <th className="py-4 px-4 text-gray-500 font-medium">
                  Статус заявки
                </th>
                <th className="py-4 px-4 text-gray-500 font-medium">Дата</th>
                <th className="py-4 px-4 text-gray-500 font-medium whitespace-nowrap">
                  Управление ролью
                </th>
              </tr>
            </thead>
            <tbody>
              {processedRequests.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">
                    История пуста
                  </td>
                </tr>
              ) : (
                processedRequests.map((req) => {
                  // Получаем актуальную роль из localStorage для каждого пользователя
                  const usersJson = localStorage.getItem("auth_users");
                  const users = usersJson ? JSON.parse(usersJson) : [];
                  const currentUser = users.find(
                    (u: any) => u.id === req.userId,
                  );
                  const currentRole = currentUser?.role || "user";

                  return (
                    <tr
                      key={req.id}
                      className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors"
                    >
                      <td className="py-4 px-4 text-white font-medium">
                        {req.username}
                      </td>
                      <td className="py-4 px-4 text-gray-400">{req.email}</td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            req.status === "approved"
                              ? "bg-green-900/30 text-green-500"
                              : "bg-red-900/30 text-red-500"
                          }`}
                        >
                          {req.status === "approved" ? "ОДОБРЕНО" : "ОТКЛОНЕНО"}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-500 text-sm">
                        {new Date(req.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4 w-48">
                        <Dropdown
                          options={roleOptions}
                          value={currentRole}
                          onChange={async (newRole) => {
                            if (
                              window.confirm(
                                `Вы уверены, что хотите изменить роль для ${req.username} на ${newRole}?`,
                              )
                            ) {
                              await changeUserRole(req.userId, newRole, req.id);
                              setTick((t) => t + 1);
                            }
                          }}
                        />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
