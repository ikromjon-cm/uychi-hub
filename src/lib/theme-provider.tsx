"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

interface ThemeContextValue {
  theme: Theme;
  mounted: boolean;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  mounted: false,
  toggle: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("uychi-theme") as Theme | null;
    const resolved = stored === "light" || stored === "dark" ? stored : "dark";
    setTheme(resolved);
    document.documentElement.classList.toggle("light", resolved === "light");
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) document.documentElement.classList.toggle("light", theme === "light");
  }, [theme, mounted]);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("uychi-theme", next);
    document.documentElement.classList.toggle("light", next === "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, mounted, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
