import { AdminTable } from "@/shared/ui/AdminTable";
import type { AdminRequest } from "@/contexts/AuthContext";
import { Avatar } from "@/shared/ui/Avatar";
import { Dropdown } from "@/shared/ui/Dropdown";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useAuth } from "@/contexts/AuthContext";

interface AdminHistoryTableProps {
  requests: AdminRequest[];
  isSuperAdmin: boolean;
  roleOptions: { id: string; label: string; value: string }[];
  onChangeRole: (
    userId: string,
    newRole: "admin" | "user",
    requestId: string,
  ) => Promise<void>;
  onRefresh: () => void;
  usersMap: Record<string, any>;
}

export function AdminHistoryTable({
  requests,
  isSuperAdmin,
  roleOptions,
  onChangeRole,
  onRefresh,
  usersMap,
}: AdminHistoryTableProps) {
  const { deleteAdminRequest, adminRequests } = useAuth();

  return (
    <>
      <AdminTable
        headers={[
          "Аватар",
          "Nickname",
          "Имя",
          "Email",
          "Кол-во",
          "Статус",
          "Дата",
          "Роль",
          ...(isSuperAdmin ? ["Действие"] : []),
        ]}
      >
        {(() => {
          if (requests.length === 0) {
            return (
              <tr>
                <td colSpan={9} className="py-8 text-center text-gray-500">
                  История пуста
                </td>
              </tr>
            );
          }

          // Группировка запросов по userId
          const groupedRequests = requests.reduce(
            (acc, req) => {
              if (!acc[req.userId]) {
                acc[req.userId] = {
                  userId: req.userId,
                  username: req.username,
                  email: req.email,
                  count: 0,
                  latestRequest: req,
                };
              }
              acc[req.userId].count += 1;
              if (
                new Date(req.createdAt).getTime() >
                new Date(acc[req.userId].latestRequest.createdAt).getTime()
              ) {
                acc[req.userId].latestRequest = req;
              }
              return acc;
            },
            {} as Record<
              string,
              {
                userId: string;
                username: string;
                email: string;
                count: number;
                latestRequest: AdminRequest;
              }
            >,
          );

          return Object.values(groupedRequests)
            .sort(
              (a, b) =>
                new Date(b.latestRequest.createdAt).getTime() -
                new Date(a.latestRequest.createdAt).getTime(),
            )
            .map((group) => {
              const req = group.latestRequest;
              const currentUser = usersMap[req.userId];
              const currentRole = currentUser?.role || "user";

              return (
                <tr
                  key={group.userId}
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
                    <span className="text-gray-300">
                      {currentUser?.name || "—"}
                    </span>
                  </td>
                  <td className="py-5 px-6">
                    <span className="text-gray-400 font-mono text-xs">
                      {req.email}
                    </span>
                  </td>
                  <td className="py-5 px-6">
                    <span className="text-gray-500 font-mono text-xs bg-gray-900/50 px-2 py-1 rounded-md border border-white/5">
                      {group.count}x
                    </span>
                  </td>
                  <td className="py-5 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                        req.status === "approved"
                          ? "bg-green-500/10 text-green-500 border border-green-500/20"
                          : "bg-red-500/10 text-red-500 border border-red-500/20"
                      }`}
                    >
                      {req.status === "approved" ? "ОДОБРЕНО" : "ОТКЛОНЕНО"}
                    </span>
                  </td>
                  <td className="py-5 px-6 text-gray-500 text-xs font-mono">
                    {new Date(req.createdAt).toLocaleDateString()}
                  </td>

                  <td className="py-5 px-6">
                    <div className="w-36">
                      {isSuperAdmin ? (
                        <Dropdown
                          options={roleOptions}
                          value={currentRole}
                          onChange={async (newRole: "admin" | "user") => {
                            if (
                              window.confirm(
                                `Вы уверены, что хотите изменить роль для ${req.username} на ${newRole}?`,
                              )
                            ) {
                              await onChangeRole(req.userId, newRole, req.id);
                              onRefresh();
                            }
                          }}
                        />
                      ) : (
                        <span className="text-gray-400 text-xs font-black uppercase">
                          {currentRole}
                        </span>
                      )}
                    </div>
                  </td>
                  {isSuperAdmin && (
                    <td className="py-5 px-6">
                      <button
                        onClick={() => {
                          if (
                            window.confirm(
                              `Удалить всю историю запросов для @${req.username}?`,
                            )
                          ) {
                            // Удаляем все запросы этого пользователя из истории (processed)
                            const userRequests = adminRequests.filter(
                              (r) =>
                                r.userId === group.userId &&
                                r.status !== "pending",
                            );
                            userRequests.forEach((r) =>
                              deleteAdminRequest(r.id),
                            );
                            onRefresh();
                          }
                        }}
                        className="bg-gray-800 hover:bg-red-600/20 text-gray-500 hover:text-red-500 p-2 rounded-xl border border-gray-700 hover:border-red-500/50 transition-all duration-200"
                        title="Удалить из истории"
                      >
                        <RiDeleteBin6Line size={16} />
                      </button>
                    </td>
                  )}
                </tr>
              );
            });
        })()}
      </AdminTable>
    </>
  );
}
