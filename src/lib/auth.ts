import Cookies from "js-cookie";
import { AuthResponse, User } from "@/types";
import { apiFetch } from "./api";

const TOKEN_KEY = "token";
const USER_KEY = "user";

export function getTokenFromCookies(): string | null {
  if (typeof document === "undefined") return null;

  const tokenRow = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="));

  return tokenRow ? tokenRow.split("=")[1] : null;
}

export function saveAuth(auth: AuthResponse) {
  Cookies.set(TOKEN_KEY, auth.token, { expires: 7 });
  localStorage.setItem(USER_KEY, JSON.stringify(auth.user));
}

export function clearAuth() {
  Cookies.remove(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getStoredToken(): string | null {
  return Cookies.get(TOKEN_KEY) || null;
}

export function getStoredUser(): User | null {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

export async function fetchMe(): Promise<User> {
  return apiFetch<User>("/me");
}