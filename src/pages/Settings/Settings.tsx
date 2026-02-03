import { useState, useRef } from "react";
import { useAuth } from "@/Folders/contexts/AuthContext";
import { Input } from "@/shared/ui/Input";
import { Avatar } from "@/shared/ui/Avatar";
import { Button } from "@/shared/ui/Button";
import { ModalAdminRequest } from "@/Folders/features/ModalAdminRequest/ModalAdminRequest";

export function Settings() {
  const { user, updateUser, logout, isAuthenticated } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isAuthenticated || !user) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4 ">Настройки</h1>
        <p className="">
          Войдите в аккаунт, чтобы получить доступ к настройкам
        </p>
      </div>
    );
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        updateUser({ avatar: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    updateUser({
      name: formData.name,
      email: formData.email,
    });
    setEditMode(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email,
    });
    setEditMode(false);
  };

  const handleRemoveAvatar = () => {
    updateUser({ avatar: undefined });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8  ">Настройки</h1>

      {/* Профиль */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4  ">Профиль</h2>
        <div className="  border border-gray-200  rounded-lg p-6">
          <div className="flex items-center gap-6 mb-6">
            <div className="flex flex-col items-center gap-2">
              <Avatar
                img={user.avatar}
                avatarSeed={user.avatarSeed}
                size="lg"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-sm px-3 py-1 bg-blue-600  rounded hover:bg-blue-700"
                >
                  Изменить
                </button>
                {user.avatar && (
                  <button
                    onClick={handleRemoveAvatar}
                    className="text-sm px-3 py-1 bg-red-600  rounded hover:bg-red-700"
                  >
                    Удалить
                  </button>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </div>
            <div className="flex-1">
              {editMode ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1  ">
                      Имя
                    </label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1  ">
                      Email
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSave} variant="primary">
                      Сохранить
                    </Button>
                    <Button onClick={handleCancel} variant="secondary">
                      Отмена
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div>
                    <label className="text-sm font-medium  ">Имя</label>
                    <p className="text-lg  ">{user.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium  ">Email</label>
                    <p className="text-lg  ">{user.email}</p>
                  </div>
                  <Button onClick={() => setEditMode(true)} variant="primary">
                    Редактировать профиль
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Стать админом */}
      {user.role !== "admin" && (
        <section className="mb-8">
          <div className=" border border-gray-200  rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium  ">
                  Запрос на статус администратора
                </h3>
                <p className="text-sm  ">
                  Отправьте запрос, чтобы получить права администратора
                </p>
              </div>
              <Button
                onClick={() => setIsAdminModalOpen(true)}
                variant="primary"
              >
                Отправить запрос
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Выход */}
      <section>
        <div className=" border border-gray-200  rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium  ">Выход из аккаунта</h3>
              <p className="text-sm  ">Выйти из текущего аккаунта</p>
            </div>
            <Button onClick={logout} variant="secondary">
              Выйти
            </Button>
          </div>
        </div>
      </section>
      {isAdminModalOpen && (
        <ModalAdminRequest
          isOpen={isAdminModalOpen}
          setIsOpen={setIsAdminModalOpen}
        />
      )}
    </div>
  );
}
