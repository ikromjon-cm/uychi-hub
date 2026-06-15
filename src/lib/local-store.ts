"use client";

const PREFIX = "uychi_data_";

// /news/articles/5/ → /news/articles/
export function collectionOf(endpoint: string): string {
  return endpoint.replace(/\/\d+\/?$/, "/");
}

// /news/articles/5/ → 5
export function idOf(endpoint: string): number | null {
  const m = endpoint.match(/\/(\d+)\/?$/);
  return m ? parseInt(m[1], 10) : null;
}

export function lsGet<T>(endpoint: string): T[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(PREFIX + endpoint);
    return raw ? (JSON.parse(raw) as T[]) : null;
  } catch { return null; }
}

export function lsSet<T>(endpoint: string, data: T[]): void {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(PREFIX + endpoint, JSON.stringify(data)); } catch {}
}

export function lsAdd<T extends Record<string, unknown>>(endpoint: string, item: T): void {
  const list = lsGet<T>(endpoint) ?? [];
  const exists = list.some(x => (x as Record<string, unknown>).id === item.id);
  lsSet(endpoint, exists
    ? list.map(x => (x as Record<string, unknown>).id === item.id ? { ...x, ...item } : x)
    : [item, ...list]
  );
}

export function lsUpdate(endpoint: string, id: number | string, updates: Record<string, unknown>): void {
  const list = lsGet<Record<string, unknown>>(endpoint) ?? [];
  lsSet(endpoint, list.map(x => x.id === id ? { ...x, ...updates } : x));
}

export function lsRemove(endpoint: string, id: number | string): void {
  const list = lsGet<Record<string, unknown>>(endpoint) ?? [];
  lsSet(endpoint, list.filter(x => x.id !== id));
}
