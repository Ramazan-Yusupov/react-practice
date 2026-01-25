import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar?: string;
  avatarSeed?: string; // Для генерации рандомной аватарки
  theme?: "light" | "dark";
  role: "admin" | "user";
}

export interface AdminRequest {
  id: string;
  userId: string;
  username: string;
  email: string;
  message: string;
  status: "pending" | "approved" | "rejected";
  createdAt: number;
}

interface AuthContextType {
  user: User | null;
  login: (identifier: string, password: string) => Promise<boolean>;
  register: (
    name: string,
    username: string,
    email: string,
    password: string,
  ) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  isAuthenticated: boolean;
  adminRequests: AdminRequest[];
  submitAdminRequest: (message: string) => Promise<boolean>;
  handleAdminRequest: (
    requestId: string,
    status: "approved" | "rejected",
  ) => Promise<void>;
  changeUserRole: (
    userId: string,
    role: "admin" | "user",
    requestId?: string,
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "auth_user";
const USERS_KEY = "auth_users"; // Для хранения всех пользователей
const ADMIN_REQUESTS_KEY = "admin_requests";

const INITIAL_ADMIN = {
  id: "admin-id",
  name: "Admin",
  username: "admin",
  email: "frontenddev747@gmail.com",
  password: "20021911Ram", // Временно такой же пароль для входа
  role: "admin" as const,
};

// Генерация рандомной аватарки (как в GitHub)
function generateAvatarSeed(email: string): string {
  return email.split("@")[0] + Math.random().toString(36).substring(7);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === "undefined") return null;
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  const [adminRequests, setAdminRequests] = useState<AdminRequest[]>(() => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem(ADMIN_REQUESTS_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  // Инициализация первого админа и обновление прав
  useEffect(() => {
    const usersJson = localStorage.getItem(USERS_KEY);
    const users: Array<User & { password: string }> = usersJson
      ? JSON.parse(usersJson)
      : [];

    const existingUserIndex = users.findIndex(
      (u) => u.email === INITIAL_ADMIN.email,
    );

    if (existingUserIndex === -1) {
      users.push(INITIAL_ADMIN);
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    } else {
      // Принудительно обновляем данные админа, если они неверные
      const existingUser = users[existingUserIndex];
      if (
        existingUser.role !== "admin" ||
        existingUser.username !== "admin" ||
        existingUser.password !== "20021911Ram"
      ) {
        users[existingUserIndex] = {
          ...existingUser,
          role: "admin",
          username: "admin",
          password: "20021911Ram",
        };
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
      }
    }

    // Также обновляем текущего пользователя, если он вошел под этой почтой
    if (user && user.email === INITIAL_ADMIN.email) {
      if (user.role !== "admin" || user.username !== "admin") {
        setUser({ ...user, role: "admin", username: "admin" });
      }
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(ADMIN_REQUESTS_KEY, JSON.stringify(adminRequests));
  }, [adminRequests]);

  const login = async (
    identifier: string,
    password: string,
  ): Promise<boolean> => {
    try {
      // Получаем всех пользователей из localStorage
      const usersJson = localStorage.getItem(USERS_KEY);
      const users: Array<User & { password: string }> = usersJson
        ? JSON.parse(usersJson)
        : [];

      // Ищем пользователя по email или username
      const foundUser = users.find(
        (u) =>
          (u.email === identifier || u.username === identifier) &&
          u.password === password,
      );

      if (foundUser) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, ...userWithoutPassword } = foundUser;
        // Если нет avatarSeed, генерируем его и сохраняем
        if (!userWithoutPassword.avatarSeed) {
          userWithoutPassword.avatarSeed = generateAvatarSeed(foundUser.email);
          // Обновляем в списке пользователей
          const userIndex = users.findIndex((u) => u.id === foundUser.id);
          if (userIndex !== -1) {
            users[userIndex].avatarSeed = userWithoutPassword.avatarSeed;
            localStorage.setItem(USERS_KEY, JSON.stringify(users));
          }
        }
        setUser(userWithoutPassword);
        return true;
      }

      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const register = async (
    name: string,
    username: string,
    email: string,
    password: string,
  ): Promise<boolean> => {
    try {
      // Получаем всех пользователей
      const usersJson = localStorage.getItem(USERS_KEY);
      const users: Array<User & { password: string }> = usersJson
        ? JSON.parse(usersJson)
        : [];

      // Проверяем, существует ли пользователь
      if (
        users.some((u) => u.email === email) ||
        users.some((u) => u.username === username)
      ) {
        return false; // Пользователь уже существует
      }

      // Создаем нового пользователя
      const avatarSeed = generateAvatarSeed(email);
      const newUser: User & { password: string } = {
        id: Date.now().toString(),
        name,
        username,
        email,
        password,
        avatarSeed,
        role: "user",
      };

      users.push(newUser);
      localStorage.setItem(USERS_KEY, JSON.stringify(users));

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      return true;
    } catch (error) {
      console.error("Register error:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      try {
        const updatedUser = { ...user, ...updates };
        setUser(updatedUser);

        // Обновляем в списке пользователей
        const usersJson = localStorage.getItem(USERS_KEY);
        if (usersJson) {
          const users: Array<User & { password: string }> =
            JSON.parse(usersJson);
          const userIndex = users.findIndex((u) => u.id === user.id);
          if (userIndex !== -1) {
            users[userIndex] = { ...users[userIndex], ...updates };
            localStorage.setItem(USERS_KEY, JSON.stringify(users));
          }
        }
      } catch (error) {
        console.error("Update user error:", error);
      }
    }
  };

  const submitAdminRequest = async (message: string): Promise<boolean> => {
    if (!user) return false;

    const newRequest: AdminRequest = {
      id: Date.now().toString(),
      userId: user.id,
      username: user.username,
      email: user.email,
      message,
      status: "pending",
      createdAt: Date.now(),
    };

    setAdminRequests((prev) => [...prev, newRequest]);
    return true;
  };

  const handleAdminRequest = async (
    requestId: string,
    status: "approved" | "rejected",
  ) => {
    setAdminRequests((prev) =>
      prev.map((req) => (req.id === requestId ? { ...req, status } : req)),
    );

    if (status === "approved") {
      const request = adminRequests.find((req) => req.id === requestId);
      if (request) {
        // Обновляем роль пользователя
        const usersJson = localStorage.getItem(USERS_KEY);
        if (usersJson) {
          const users: Array<User & { password: string }> =
            JSON.parse(usersJson);
          const userIndex = users.findIndex((u) => u.id === request.userId);
          if (userIndex !== -1) {
            users[userIndex].role = "admin";
            localStorage.setItem(USERS_KEY, JSON.stringify(users));

            // Если это текущий пользователь, обновляем его
            if (user?.id === request.userId) {
              setUser({ ...user, role: "admin" });
            }
          }
        }
      }
    }
  };

  const changeUserRole = async (
    userId: string,
    role: "admin" | "user",
    requestId?: string,
  ) => {
    const usersJson = localStorage.getItem(USERS_KEY);
    if (usersJson) {
      const users: Array<User & { password: string }> = JSON.parse(usersJson);
      const userIndex = users.findIndex((u) => u.id === userId);
      if (userIndex !== -1) {
        users[userIndex].role = role;
        localStorage.setItem(USERS_KEY, JSON.stringify(users));

        // Если это текущий пользователь, обновляем его сессию
        if (user?.id === userId) {
          setUser({ ...user, role });
        }

        // Обновляем статус заявки, если указан requestId
        if (requestId) {
          setAdminRequests((prev) =>
            prev.map((req) =>
              req.id === requestId
                ? { ...req, status: role === "admin" ? "approved" : "rejected" }
                : req,
            ),
          );
        } else if (role === "admin") {
          // Если requestId не указан, но роль админ - находим последнюю пендинг заявку этого юзера
          setAdminRequests((prev) =>
            prev.map((req) =>
              req.userId === userId && req.status === "pending"
                ? { ...req, status: "approved" }
                : req,
            ),
          );
        }
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        updateUser,
        isAuthenticated: !!user,
        adminRequests,
        submitAdminRequest,
        handleAdminRequest,
        changeUserRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Хук для использования контекста аутентификации
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
