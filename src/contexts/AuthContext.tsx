"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { StrapiUser } from "@/lib/api";
import { AUTH_STORAGE_KEY } from "@/lib/api";

const AUTH_KEY = AUTH_STORAGE_KEY;

export type AuthUser = { email: string; username?: string; id?: number };

type StoredAuth = { user: AuthUser; jwt: string };

type AuthContextValue = {
  user: AuthUser | null;
  jwt: string | null;
  setUser: (user: AuthUser | null, jwt?: string | null) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function readStored(): StoredAuth | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as StoredAuth;
    if (!data?.user?.email || !data?.jwt) return null;
    return data;
  } catch {
    return null;
  }
}

function toAuthUser(u: StrapiUser): AuthUser {
  return { email: u.email, username: u.username, id: u.id };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<AuthUser | null>(null);
  const [jwt, setJwtState] = useState<string | null>(null);

  useEffect(() => {
    const stored = readStored();
    if (stored) {
      setUserState(stored.user);
      setJwtState(stored.jwt);
    }
  }, []);

  const setUser = useCallback((u: AuthUser | null, j: string | null = null) => {
    setUserState(u);
    setJwtState(j ?? null);
    if (typeof window !== "undefined") {
      if (u && j) {
        localStorage.setItem(AUTH_KEY, JSON.stringify({ user: u, jwt: j }));
      } else {
        localStorage.removeItem(AUTH_KEY);
      }
    }
  }, []);

  const logout = useCallback(() => {
    setUserState(null);
    setJwtState(null);
    if (typeof window !== "undefined") localStorage.removeItem(AUTH_KEY);
  }, []);

  return (
    <AuthContext.Provider value={{ user, jwt, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export { toAuthUser };
