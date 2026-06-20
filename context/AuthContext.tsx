import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signInWithPopup,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { Platform } from "react-native";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db, isFirebaseConfigured } from "@/lib/firebase";
import { getData, removeData, storeData, STORAGE_KEYS } from "@/lib/storage";
import type { User, UserRole } from "@/lib/types";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  signInWithGoogle: (accessToken?: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
  isAdmin: () => boolean;
  isInstructor: () => boolean;
  canPost: () => boolean;
  checkUsernameAvailable: (username: string) => Promise<boolean>;
  registerUser: (user: User) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_EMAIL = "leivisonbrito64@gmail.com";

function buildDefaultUser(uid: string, email: string, photoURL: string): User {
  const role: UserRole =
    email.toLowerCase() === ADMIN_EMAIL.toLowerCase()
      ? "administrador"
      : "usuario";
  return {
    id: uid,
    username: "",
    photoURL,
    email,
    role,
    createdAt: new Date().toISOString(),
    postCount: 0,
    commentCount: 0,
    likesReceived: 0,
    savedPosts: [],
    blockedUsers: [],
    hiddenPosts: [],
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      loadLocalUser();
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          const userRef = doc(db, "users", firebaseUser.uid);
          const snap = await getDoc(userRef);
          if (snap.exists()) {
            const data = snap.data() as User;
            const email = (data.email || firebaseUser.email || "").toLowerCase();
            const correctRole: UserRole =
              email === ADMIN_EMAIL.toLowerCase() ? "administrador" : data.role;
            const updatedUser = { ...data, id: firebaseUser.uid, role: correctRole };
            setUser(updatedUser);
            await storeData(STORAGE_KEYS.USER, updatedUser);
            if (correctRole !== data.role) {
              updateDoc(userRef, { role: correctRole }).catch(() => {});
            }
          } else {
            const partial = buildDefaultUser(
              firebaseUser.uid,
              firebaseUser.email ?? "",
              firebaseUser.photoURL ?? ""
            );
            setUser(partial);
            await storeData(STORAGE_KEYS.USER, partial);
          }
        } else {
          setUser(null);
          await removeData(STORAGE_KEYS.USER);
        }
      } finally {
        setIsLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const loadLocalUser = async () => {
    try {
      const stored = await getData<User>(STORAGE_KEYS.USER);
      if (stored) setUser(stored);
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = useCallback(async (accessToken?: string) => {
    if (!isFirebaseConfigured) {
      const demoUser = buildDefaultUser(`demo_${Date.now()}`, "demo@gmail.com", "");
      setUser(demoUser);
      await storeData(STORAGE_KEYS.USER, demoUser);
      return;
    }

    if (Platform.OS === "web") {
      const provider = new GoogleAuthProvider();
      provider.addScope("email");
      provider.addScope("profile");
      provider.setCustomParameters({ prompt: "select_account" });
      await signInWithPopup(auth, provider);
      // onAuthStateChanged handles the rest
    } else if (accessToken) {
      // accessToken aqui é na verdade o idToken vindo do @react-native-google-signin
      const credential = GoogleAuthProvider.credential(accessToken);
      await signInWithCredential(auth, credential);
    } else {
      throw new Error("ID_TOKEN_REQUIRED");
    }
  }, []);

  const logout = useCallback(async () => {
    if (isFirebaseConfigured) {
      await firebaseSignOut(auth);
    }
    await removeData(STORAGE_KEYS.USER);
    setUser(null);
  }, []);

  const updateUser = useCallback(
    async (updates: Partial<User>) => {
      if (!user) return;
      const updated = { ...user, ...updates };
      setUser(updated);
      await storeData(STORAGE_KEYS.USER, updated);

      if (isFirebaseConfigured) {
        const userRef = doc(db, "users", user.id);
        await updateDoc(userRef, { ...updates });
      }
    },
    [user]
  );

  const registerUser = useCallback(
    async (newUser: User) => {
      setUser(newUser);
      await storeData(STORAGE_KEYS.USER, newUser);

      if (isFirebaseConfigured) {
        const userRef = doc(db, "users", newUser.id);
        await setDoc(userRef, {
          ...newUser,
          createdAt: serverTimestamp(),
        });
      } else {
        const users = (await getData<User[]>(STORAGE_KEYS.USERS_LIST)) ?? [];
        users.push(newUser);
        await storeData(STORAGE_KEYS.USERS_LIST, users);
      }
    },
    []
  );

  const checkUsernameAvailable = useCallback(
    async (username: string): Promise<boolean> => {
      const normalized = username.toLowerCase().replace("@", "");
      if (isFirebaseConfigured) {
        const q = query(
          collection(db, "users"),
          where("username", "==", normalized)
        );
        const snap = await getDocs(q);
        return snap.empty || snap.docs[0].id === user?.id;
      }
      const users = (await getData<User[]>(STORAGE_KEYS.USERS_LIST)) ?? [];
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
    () => user?.role === "instrutor" || user?.role === "administrador",
    [user]
  );
  const canPost = useCallback(
    () => user?.role === "instrutor" || user?.role === "administrador",
    [user]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isLoggedIn: !!user && !!user.username,
        signInWithGoogle,
        logout,
        updateUser,
        isAdmin,
        isInstructor,
        canPost,
        checkUsernameAvailable,
        registerUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
