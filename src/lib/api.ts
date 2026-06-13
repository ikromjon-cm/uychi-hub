"use client";

import { useEffect, useState } from "react";

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

export function useApi<T>(endpoint: string, fallback: T, mockFallback?: T) {
  const [data, setData] = useState<T>(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const url = `${API_BASE}${endpoint}`;
    const token = getToken();

    const doFetch = (withAuth: boolean): Promise<unknown> =>
      fetch(url, { headers: withAuth && token ? { Authorization: `Bearer ${token}` } : {} })
        .then((r) => {
          if (r.status === 401 && withAuth) return doFetch(false);
          if (!r.ok) throw new Error(`HTTP ${r.status}`);
          return r.json() as Promise<unknown>;
        });

    doFetch(!!token)
      .then((json: unknown) => {
        if (!cancelled) {
          const j = json as Record<string, unknown>;
          const result = (j.results ?? json) as T;
          if (Array.isArray(result) && result.length === 0 && mockFallback) {
            setData(mockFallback);
          } else {
            setData(result);
          }
        }
      })
      .catch((e: Error) => {
        if (!cancelled) {
          setError(e.message);
          if (mockFallback) setData(mockFallback);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [endpoint]);

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
  return res.json();
}

export async function apiPatch(endpoint: string, body: unknown) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function apiDelete(endpoint: string) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: "DELETE",
    headers: getToken() ? { Authorization: `Bearer ${getToken()}` } : {},
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
}

export async function login(username: string, password: string) {
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
    return null;
  }
}
