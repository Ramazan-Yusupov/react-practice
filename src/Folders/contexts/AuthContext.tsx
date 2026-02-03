import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../../firebase";

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar?: string;
  avatarSeed?: string;
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
  loading: boolean;
  login: (identifier: string, password: string) => Promise<boolean>;
  register: (
    name: string,
    username: string,
    email: string,
    password: string,
  ) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => Promise<void>;
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
  getAllUsers: () => Promise<Array<User>>;
  deleteAdminRequest: (requestId: string) => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Генерация рандомной аватарки
function generateAvatarSeed(email: string): string {
  return email.split("@")[0] + Math.random().toString(36).substring(7);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [adminRequests, setAdminRequests] = useState<AdminRequest[]>([]);

  // Слушатель состояния авторизации
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Получаем данные пользователя из Firestore
        const userDocRef = doc(db, "users", firebaseUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data() as User;

          // Auto-promote Super Admin if needed
          if (
            firebaseUser.email === "frontenddev747@gmail.com" &&
            userData.role !== "admin"
          ) {
            await updateDoc(userDocRef, { role: "admin" });
            userData.role = "admin";
          }

          setUser(userData);
        } else {
          // Если документа нет (странная ситуация), создаем базовый
          console.error("User document not found for", firebaseUser.uid);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Загрузка заявок на админа (только если админ)
  useEffect(() => {
    if (user?.role === "admin") {
      const fetchRequests = async () => {
        const q = query(collection(db, "admin_requests"));
        const querySnapshot = await getDocs(q);
        const requests: AdminRequest[] = [];
        querySnapshot.forEach((doc) => {
          requests.push({ id: doc.id, ...doc.data() } as AdminRequest);
        });
        setAdminRequests(requests);
      };
      fetchRequests();
    } else {
      setAdminRequests([]);
    }
  }, [user]);

  const login = async (
    identifier: string,
    password: string,
  ): Promise<boolean> => {
    try {
      // Firebase Auth поддерживает вход только по email.
      // Если identifier не email, придется сначала найти email по username в Firestore.
      let emailToUse = identifier;

      if (!identifier.includes("@")) {
        // Ищем по username
        const q = query(
          collection(db, "users"),
          where("username", "==", identifier),
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          emailToUse = querySnapshot.docs[0].data().email;
        } else {
          return false; // Пользователь не найден
        }
      }

      await signInWithEmailAndPassword(auth, emailToUse, password);
      return true;
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
      // Проверяем уникальность username
      const q = query(
        collection(db, "users"),
        where("username", "==", username),
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        console.error("Username already taken");
        return false;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const firebaseUser = userCredential.user;

      const newUser: User = {
        id: firebaseUser.uid,
        name,
        username,
        email,
        avatarSeed: generateAvatarSeed(email),
        role: "user",
      };

      // Сохраняем данные пользователя в Firestore
      await setDoc(doc(db, "users", firebaseUser.uid), newUser);
      setUser(newUser);
      return true;
    } catch (error) {
      console.error("Register error:", error);
      return false;
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  const updateUser = async (updates: Partial<User>) => {
    if (user) {
      try {
        const userDocRef = doc(db, "users", user.id);
        await updateDoc(userDocRef, updates);
        setUser({ ...user, ...updates });
      } catch (error) {
        console.error("Update user error:", error);
      }
    }
  };

  const submitAdminRequest = async (message: string): Promise<boolean> => {
    if (!user) return false;

    try {
      const newRequest = {
        userId: user.id,
        username: user.username,
        email: user.email,
        message,
        status: "pending",
        createdAt: Date.now(),
      };

      const docRef = await addDoc(collection(db, "admin_requests"), newRequest);
      // Добавляем ID документа к локальному состоянию для немедленного отображения
      setAdminRequests((prev) => [
        ...prev,
        { id: docRef.id, ...newRequest } as AdminRequest,
      ]);
      return true;
    } catch (error) {
      console.error("Submit request error:", error);
      return false;
    }
  };

  const handleAdminRequest = async (
    requestId: string,
    status: "approved" | "rejected",
  ) => {
    try {
      const requestRef = doc(db, "admin_requests", requestId);
      await updateDoc(requestRef, { status });

      setAdminRequests((prev) =>
        prev.map((req) => (req.id === requestId ? { ...req, status } : req)),
      );

      if (status === "approved") {
        const request = adminRequests.find((req) => req.id === requestId);
        if (request) {
          // Обновляем роль пользователя в Firestore
          const userRef = doc(db, "users", request.userId);
          await updateDoc(userRef, { role: "admin" });
        }
      }
    } catch (error) {
      console.error("Handle request error:", error);
    }
  };

  const changeUserRole = async (
    userId: string,
    role: "admin" | "user",
    requestId?: string,
  ) => {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, { role });

      // Обновляем статус заявки, если есть ID
      if (requestId) {
        const requestRef = doc(db, "admin_requests", requestId);
        await updateDoc(requestRef, {
          status: role === "admin" ? "approved" : "rejected",
        });

        setAdminRequests((prev) =>
          prev.map((req) =>
            req.id === requestId
              ? { ...req, status: role === "admin" ? "approved" : "rejected" }
              : req,
          ),
        );
      }

      // Если меняем роль текущего пользователя
      if (user?.id === userId) {
        setUser({ ...user, role });
      }
    } catch (error) {
      console.error("Change role error:", error);
    }
  };

  const getAllUsers = async (): Promise<Array<User>> => {
    try {
      const q = query(collection(db, "users"));
      const querySnapshot = await getDocs(q);
      const users: User[] = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data() as User);
      });
      return users;
    } catch (error) {
      console.error("Get all users error:", error);
      return [];
    }
  };

  const deleteAdminRequest = async (requestId: string) => {
    try {
      await deleteDoc(doc(db, "admin_requests", requestId));
      setAdminRequests((prev) => prev.filter((req) => req.id !== requestId));
    } catch (error) {
      console.error("Delete request error:", error);
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      await deleteDoc(doc(db, "users", userId));

      // Firebase Auth API не позволяет удалить другого пользователя без Firebase Admin SDK on backend.
      // Но мы можем удалить его запись в Firestore, чтобы он не мог войти (проверка в login).

      // Удаляем связанные заявки
      const requestsQuery = query(
        collection(db, "admin_requests"),
        where("userId", "==", userId),
      );
      const requestsSnapshot = await getDocs(requestsQuery);
      requestsSnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      setAdminRequests((prev) => prev.filter((req) => req.userId !== userId));

      if (user?.id === userId) {
        await logout();
      }
    } catch (error) {
      console.error("Delete user error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateUser,
        isAuthenticated: !!user,
        adminRequests,
        submitAdminRequest,
        handleAdminRequest,
        changeUserRole,
        getAllUsers,
        deleteAdminRequest,
        deleteUser,
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
