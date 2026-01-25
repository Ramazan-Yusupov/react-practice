import { Input } from "@/shared/ui/Input";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function ModalAuth({ isOpen, setIsOpen }: ModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();

  // Форма регистрации
  const [registerData, setRegisterData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  // Форма входа
  const [loginData, setLoginData] = useState({
    identifier: "",
    password: "",
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (
      !registerData.name ||
      !registerData.username ||
      !registerData.email ||
      !registerData.password
    ) {
      setError("Все поля обязательны");
      setLoading(false);
      return;
    }

    const success = await register(
      registerData.name,
      registerData.username,
      registerData.email,
      registerData.password,
    );

    if (success) {
      setIsOpen(false);
      setRegisterData({ name: "", username: "", email: "", password: "" });
    } else {
      setError("Пользователь с таким email или ником уже существует");
    }

    setLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!loginData.identifier || !loginData.password) {
      setError("Все поля обязательны");
      setLoading(false);
      return;
    }

    const success = await login(loginData.identifier, loginData.password);

    if (success) {
      setIsOpen(false);
      setLoginData({ identifier: "", password: "" });
    } else {
      setError("Неверный email/ник или пароль");
    }

    setLoading(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    setError("");
    setRegisterData({ name: "", username: "", email: "", password: "" });
    setLoginData({ identifier: "", password: "" });
  };

  return (
    <>
      {isOpen && (
        <>
          <div
            onClick={handleClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-800 border-2 rounded-lg p-6 w-96 relative z-50"
            >
              <button
                onClick={handleClose}
                className="absolute top-4 right-4  dark:text-gray-400 dark:hover:text-gray-200 text-3xl"
              >
                ×
              </button>

              {isLogin ? (
                <form onSubmit={handleLogin}>
                  <h2 className="text-2xl font-bold mb-6 ">Login</h2>
                  {error && (
                    <div className="mb-4 p-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded">
                      {error}
                    </div>
                  )}
                  <div className="flex flex-col gap-3 mb-3">
                    <Input
                      type="text"
                      placeholder="Email or Username"
                      value={loginData.identifier}
                      onChange={(e) =>
                        setLoginData({
                          ...loginData,
                          identifier: e.target.value,
                        })
                      }
                    />
                    <Input
                      type="password"
                      placeholder="Password"
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({ ...loginData, password: e.target.value })
                      }
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 mb-4"
                  >
                    {loading ? "Вход..." : "Login"}
                  </button>
                  <p className="text-center text-gray-600 dark:text-gray-400">
                    No account?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setIsLogin(false);
                        setError("");
                      }}
                      className="text-blue-600 hover:underline font-semibold"
                    >
                      Register
                    </button>
                  </p>
                </form>
              ) : (
                <form onSubmit={handleRegister}>
                  <h2 className="text-2xl font-bold mb-6 ">Register</h2>
                  {error && (
                    <div className="mb-4 p-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded">
                      {error}
                    </div>
                  )}
                  <div className="flex flex-col gap-3 mb-3">
                    <Input
                      type="text"
                      placeholder="Name"
                      value={registerData.name}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          name: e.target.value,
                        })
                      }
                    />
                    <Input
                      type="text"
                      placeholder="Username"
                      value={registerData.username}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          username: e.target.value,
                        })
                      }
                    />
                    <Input
                      type="email"
                      placeholder="Email"
                      value={registerData.email}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          email: e.target.value,
                        })
                      }
                    />
                    <Input
                      type="password"
                      placeholder="Password"
                      value={registerData.password}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          password: e.target.value,
                        })
                      }
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 mb-4"
                  >
                    {loading ? "Регистрация..." : "Register"}
                  </button>
                  <p className="text-center text-gray-600 dark:text-gray-400">
                    Have account?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setIsLogin(true);
                        setError("");
                      }}
                      className="text-blue-600 hover:underline font-semibold"
                    >
                      Login
                    </button>
                  </p>
                </form>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
