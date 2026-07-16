import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { getData, removeData, storeData, STORAGE_KEYS } from '@/lib/storage';
import type { User } from '@/lib/types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (username: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  signIn: async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData<User>(STORAGE_KEYS.USER).then((u) => {
      setUser(u);
      setIsLoading(false);
    });
  }, []);

  const signIn = useCallback(async (username: string) => {
    const newUser: User = {
      id: Date.now().toString(),
      username: username.trim(),
      email: '',
      role: 'usuario',
      createdAt: new Date().toISOString(),
    };
    await storeData(STORAGE_KEYS.USER, newUser);
    setUser(newUser);
  }, []);

  const signOut = useCallback(async () => {
    await removeData(STORAGE_KEYS.USER);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
