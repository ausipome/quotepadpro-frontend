"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { AuthResponse, User } from "@/types";
import { clearAuth, fetchMe, getStoredToken, getStoredUser, saveAuth } from "@/lib/auth";

type AuthContextType = {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (auth: AuthResponse) => void;
  logout: () => void;
  refreshMe: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = getStoredToken();
    const storedUser = getStoredUser();

    if (storedToken) {
      setToken(storedToken);
    }

    if (storedUser) {
      setUser(storedUser);
    }

    if (!storedToken) {
      setLoading(false);
      return;
    }

    fetchMe()
      .then((me) => {
        setUser(me);
      })
      .catch(() => {
        clearAuth();
        setUser(null);
        setToken(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const login = (auth: AuthResponse) => {
    saveAuth(auth);
    setUser(auth.user);
    setToken(auth.token);
  };

  const logout = () => {
    clearAuth();
    setUser(null);
    setToken(null);
    router.push("/login");
  };

  const refreshMe = async () => {
    const me = await fetchMe();
    localStorage.setItem("user", JSON.stringify(me));
    setUser(me);
  };

  const value = useMemo(
    () => ({ user, token, loading, login, logout, refreshMe }),
    [user, token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}