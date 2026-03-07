import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

// ─── Типы ──────────────────────────────────────────────────────────────────
export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

// ─── Константы ─────────────────────────────────────────────────────────────
const STORAGE_KEYS = {
  TOKEN: "auth_token",
  USER: "auth_user",
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ─── Имитация API ──────────────────────────────────────────────────────────
// В реальности здесь будут fetch/axios запросы к бэкенду
const fakeApi = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Имитация задержки

    if (email === "test@example.com" && password === "password123") {
      return {
        user: {
          id: 1,
          name: "Test User",
          email,
          avatar: "https://i.pravatar.cc/150?u=test",
        },
        token: "fake-jwt-token-" + Date.now(),
      };
    }
    throw new Error("Неверный email или пароль");
  },

  register: async (
    name: string,
    email: string,
    password: string,
  ): Promise<AuthResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (password.length < 6) {
      throw new Error("Пароль должен быть не менее 6 символов");
    }

    return {
      user: {
        id: Date.now(),
        name,
        email,
        avatar: `https://i.pravatar.cc/150?u=${email}`,
      },
      token: "fake-jwt-token-" + Date.now(),
    };
  },
};

// ─── Провайдер ─────────────────────────────────────────────────────────────
interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🔹 Восстановление сессии при загрузке
  useEffect(() => {
    const initAuth = () => {
      try {
        const storedToken = localStorage.getItem(STORAGE_KEYS.TOKEN);
        const storedUser = localStorage.getItem(STORAGE_KEYS.USER);

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
      } catch (err) {
        console.error("Ошибка восстановления сессии:", err);
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  // 🔹 Логин
  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fakeApi.login(email, password);
      setUser(response.user);
      setToken(response.token);

      localStorage.setItem(STORAGE_KEYS.TOKEN, response.token);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка входа");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 🔹 Регистрация
  const register = useCallback(
    async (name: string, email: string, password: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fakeApi.register(name, email, password);
        setUser(response.user);
        setToken(response.token);

        localStorage.setItem(STORAGE_KEYS.TOKEN, response.token);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Ошибка регистрации");
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  // 🔹 Выход
  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    setError(null);

    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  }, []);

  // 🔹 Очистка ошибки
  const clearError = useCallback(() => setError(null), []);

  // 🔹 Оптимизация значения контекста
  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: !!user && !!token,
      isLoading,
      error,
      login,
      register,
      logout,
      clearError,
    }),
    [user, token, isLoading, error, login, register, logout, clearError],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext };
