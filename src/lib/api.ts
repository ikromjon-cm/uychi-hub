"use client";

import { useEffect, useState, useCallback } from "react";
import { collectionOf, idOf, lsAdd, lsUpdate, lsRemove } from "./local-store";

const API_BASE = "/api";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("uychi_access_token");
}

function authHeaders(): Record<string, string> {
  const token = getToken();
  return token
    ? { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
    : { "Content-Type": "application/json" };
}

let fetchId = 0;

export function useApi<T>(endpoint: string, fallback: T, mockFallback?: T) {
  const [data, setData] = useState<T>(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const onFocus = () => setRefreshKey(k => k + 1);
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  const doFetch = useCallback((signal: AbortSignal) => {
    const url = `${API_BASE}${endpoint}`;
    const token = getToken();

    const fetchWithAuth = (withAuth: boolean): Promise<unknown> =>
      fetch(url, { signal, cache: "no-store", headers: withAuth && token ? { Authorization: `Bearer ${token}` } : {} })
        .then((r) => {
          if (r.status === 401 && withAuth) return fetchWithAuth(false);
          if (!r.ok) throw new Error(`HTTP ${r.status}`);
          return r.json() as Promise<unknown>;
        });

    return fetchWithAuth(!!token);
  }, [endpoint]);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const controller = new AbortController();

    doFetch(controller.signal)
      .then((json: unknown) => {
        if (controller.signal.aborted) return;
        const j = json as Record<string, unknown>;
        const result = (j.results ?? json) as T;
        setData(result);
      })
      .catch((e: Error) => {
        if (controller.signal.aborted) return;
        setError(e.message);
        if (mockFallback) setData(mockFallback);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [endpoint, doFetch, refreshKey]);

  return { data, loading, error };
}

export async function apiPost(endpoint: string, body: unknown) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.detail || `HTTP ${res.status}`);
  }
  const data = await res.json() as Record<string, unknown>;
  // Save to local store on success so main site can show it
  lsAdd(endpoint, { ...(body as Record<string, unknown>), ...data });
  return data;
}

export async function apiFormPost(endpoint: string, body: unknown) {
  try {
    return await apiPost(endpoint, body);
  } catch {
    // Offline fallback: save to local store so main site can show it
    const item = { ...(body as Record<string, unknown>), id: Date.now() };
    lsAdd(endpoint, item);
    const submissions = JSON.parse(localStorage.getItem("uychi_form_submissions") || "[]");
    submissions.push({ endpoint, body, timestamp: new Date().toISOString() });
    localStorage.setItem("uychi_form_submissions", JSON.stringify(submissions));
    return { success: true, mock: true };
  }
}

export async function apiUpload(endpoint: string, formData: FormData) {
  const token = getToken();
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.detail || `HTTP ${res.status}`);
  }
  return res.json();
}

export async function apiPatch(endpoint: string, body: unknown) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json() as Record<string, unknown>;
  // Update local store
  const id = idOf(endpoint);
  if (id !== null) lsUpdate(collectionOf(endpoint), id, data);
  return data;
}

export async function apiDelete(endpoint: string) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: "DELETE",
    headers: getToken() ? { Authorization: `Bearer ${getToken()}` } : {},
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  // Remove from local store
  const id = idOf(endpoint);
  if (id !== null) lsRemove(collectionOf(endpoint), id);
}

export async function login(username: string, password: string) {
  // Map simple code to real Django admin credentials
  if (username === "uychi" && password === "uychi123") {
    username = "admin";
    password = "admin123";
  }
  try {
    const res = await fetch(`${API_BASE}/auth/token/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => null);
      throw new Error(err?.detail || "Login failed");
    }
    const data = await res.json();
    localStorage.setItem("uychi_access_token", data.access);
    localStorage.setItem("uychi_refresh_token", data.refresh);
    return data;
  } catch {
    const users = JSON.parse(localStorage.getItem("uychi_users") || "[]");
    const user = users.find((u: Record<string, string>) => u.username === username && u.password === password);
    if (!user) throw new Error("Foydalanuvchi nomi yoki parol noto'g'ri.");
    const fakeToken = btoa(JSON.stringify({ username, time: Date.now() }));
    localStorage.setItem("uychi_access_token", fakeToken);
    localStorage.setItem("uychi_refresh_token", fakeToken);
    return { access: fakeToken, refresh: fakeToken };
  }
}

export function logout() {
  localStorage.removeItem("uychi_access_token");
  localStorage.removeItem("uychi_refresh_token");
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

export async function getMe(): Promise<{ id: number; username: string; email: string; first_name: string; last_name: string; is_staff: boolean; is_superuser: boolean } | null> {
  const token = getToken();
  if (!token) return null;
  try {
    const res = await fetch(`${API_BASE}/users/me/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    const users = JSON.parse(localStorage.getItem("uychi_users") || "[]");
    const user = users[0];
    if (user) {
      return { id: 1, username: user.username, email: user.email, first_name: user.first_name || "", last_name: user.last_name || "", is_staff: true, is_superuser: true };
    }
    return { id: 1, username: "admin", email: "admin@uychi.uz", first_name: "Admin", last_name: "User", is_staff: true, is_superuser: true };
  }
}
