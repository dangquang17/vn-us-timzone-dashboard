import { useEffect, useMemo, useState } from "react";

export type ThemeMode = "light" | "dark" | "system";

const STORAGE_KEY = "vn-us-clock-theme";

function getSystemTheme() {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getStoredTheme(): ThemeMode {
  if (typeof window === "undefined") {
    return "system";
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);

  if (stored === "light" || stored === "dark" || stored === "system") {
    return stored;
  }

  return "system";
}

function applyResolvedTheme(resolvedTheme: "light" | "dark") {
  const root = document.documentElement;
  const themeColor = resolvedTheme === "dark" ? "#04101d" : "#fffaf2";
  const themeMeta = document.querySelector('meta[name="theme-color"]');

  root.dataset.theme = resolvedTheme;
  root.style.colorScheme = resolvedTheme;

  if (themeMeta) {
    themeMeta.setAttribute("content", themeColor);
  }
}

export function useTheme() {
  const [mode, setMode] = useState<ThemeMode>(() => getStoredTheme());
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">(
    () => getSystemTheme(),
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const syncSystemTheme = () => {
      setSystemTheme(mediaQuery.matches ? "dark" : "light");
    };

    syncSystemTheme();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", syncSystemTheme);
    } else {
      mediaQuery.addListener(syncSystemTheme);
    }

    window.addEventListener("focus", syncSystemTheme);
    document.addEventListener("visibilitychange", syncSystemTheme);

    return () => {
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", syncSystemTheme);
      } else {
        mediaQuery.removeListener(syncSystemTheme);
      }

      window.removeEventListener("focus", syncSystemTheme);
      document.removeEventListener("visibilitychange", syncSystemTheme);
    };
  }, []);

  const resolvedTheme = useMemo(
    () => (mode === "system" ? systemTheme : mode),
    [mode, systemTheme],
  );

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, mode);
    applyResolvedTheme(resolvedTheme);
  }, [mode, resolvedTheme]);

  useEffect(() => {
    const syncStoredMode = () => {
      setMode(getStoredTheme());
    };

    window.addEventListener("storage", syncStoredMode);
    return () => window.removeEventListener("storage", syncStoredMode);
  }, []);

  return {
    mode,
    resolvedTheme,
    setMode,
  };
}
