import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { getData, removeData, storeData, STORAGE_KEYS } from "@/lib/storage";
import type { User, UserRole } from "@/lib/types";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  login: (mockUser?: Partial<User>) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
  isAdmin: () => boolean;
  isInstructor: () => boolean;
  canPost: () => boolean;
  checkUsernameAvailable: (username: string) => Promise<boolean>;
  registerUser: (user: User) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const stored = await getData<User>(STORAGE_KEYS.USER);
      if (stored) setUser(stored);
    } finally {
      setIsLoading(false);
    }
  };

  const login = useCallback(async (mockUser?: Partial<User>) => {
    const defaultUser: User = {
      id: `user_${Date.now()}`,
      username: "",
      photoURL: "",
      email: "usuario@demo.com",
      role: "usuario",
      createdAt: new Date().toISOString(),
      postCount: 0,
      commentCount: 0,
      likesReceived: 0,
      savedPosts: [],
      blockedUsers: [],
      hiddenPosts: [],
      ...mockUser,
    };
    setUser(defaultUser);
    await storeData(STORAGE_KEYS.USER, defaultUser);
  }, []);

  const logout = useCallback(async () => {
    await removeData(STORAGE_KEYS.USER);
    setUser(null);
  }, []);

  const updateUser = useCallback(
    async (updates: Partial<User>) => {
      if (!user) return;
      const updated = { ...user, ...updates };
      setUser(updated);
      await storeData(STORAGE_KEYS.USER, updated);

      const users = (await getData<User[]>(STORAGE_KEYS.USERS_LIST)) ?? [];
      const idx = users.findIndex((u) => u.id === user.id);
      if (idx >= 0) {
        users[idx] = updated;
        await storeData(STORAGE_KEYS.USERS_LIST, users);
      }
    },
    [user]
  );

  const registerUser = useCallback(async (newUser: User) => {
    const users = (await getData<User[]>(STORAGE_KEYS.USERS_LIST)) ?? [];
    users.push(newUser);
    await storeData(STORAGE_KEYS.USERS_LIST, users);
    setUser(newUser);
    await storeData(STORAGE_KEYS.USER, newUser);
  }, []);

  const checkUsernameAvailable = useCallback(
    async (username: string): Promise<boolean> => {
      const users = (await getData<User[]>(STORAGE_KEYS.USERS_LIST)) ?? [];
      const normalized = username.toLowerCase().replace("@", "");
      return !users.some(
        (u) =>
          u.username.toLowerCase().replace("@", "") === normalized &&
          u.id !== user?.id
      );
    },
    [user]
  );

  const isAdmin = useCallback(() => user?.role === "administrador", [user]);
  const isInstructor = useCallback(
    () =>
      user?.role === "instrutor" || user?.role === "administrador",
    [user]
  );
  const canPost = useCallback(
    () => user?.role === "instrutor" || user?.role === "administrador",
    [user]
  );

  const value: AuthContextType = {
    user,
    isLoading,
    isLoggedIn: !!user && !!user.username,
    login,
    logout,
    updateUser,
    isAdmin,
    isInstructor,
    canPost,
    checkUsernameAvailable,
    registerUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
