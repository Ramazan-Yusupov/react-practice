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
  email: string;
  avatar?: string;
  avatarSeed?: string; // Для генерации рандомной аватарки
  theme?: "light" | "dark";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "auth_user";
const USERS_KEY = "auth_users"; // Для хранения всех пользователей

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

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Получаем всех пользователей из localStorage
      const usersJson = localStorage.getItem(USERS_KEY);
      const users: Array<User & { password: string }> = usersJson
        ? JSON.parse(usersJson)
        : [];

      // Ищем пользователя
      const foundUser = users.find(
        (u) => u.email === email && u.password === password
      );

      if (foundUser) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, ...userWithoutPassword } = foundUser;
        // Если нет avatarSeed, генерируем его и сохраняем
        if (!userWithoutPassword.avatarSeed) {
          userWithoutPassword.avatarSeed = generateAvatarSeed(email);
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
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      // Получаем всех пользователей
      const usersJson = localStorage.getItem(USERS_KEY);
      const users: Array<User & { password: string }> = usersJson
        ? JSON.parse(usersJson)
        : [];

      // Проверяем, существует ли пользователь
      if (users.some((u) => u.email === email)) {
        return false; // Пользователь уже существует
      }

      // Создаем нового пользователя
      const avatarSeed = generateAvatarSeed(email);
      const newUser: User & { password: string } = {
        id: Date.now().toString(),
        name,
        email,
        password,
        avatarSeed,
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

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        updateUser,
        isAuthenticated: !!user,
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
