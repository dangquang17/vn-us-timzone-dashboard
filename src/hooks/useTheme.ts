import {
  ReactNode,
  createContext,
  createElement,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  ResolvedTheme,
  THEME_STORAGE_KEY,
  ThemeMode,
  applyThemeToDocument,
  getSystemTheme,
  readStoredTheme,
  resolveTheme,
} from "../utils/theme";

export type { ThemeMode } from "../utils/theme";

type ThemeContextValue = {
  mode: ThemeMode;
  resolvedTheme: ResolvedTheme;
  setMode: (mode: ThemeMode) => void;
};

type ThemeProviderProps = {
  children: ReactNode;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

// Creates the theme state and keeps it synced with localStorage, system preference, and the DOM.
function useThemeController(): ThemeContextValue {
  const [mode, setMode] = useState<ThemeMode>(() => readStoredTheme());
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(
    () => getSystemTheme(),
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    // Re-reads the browser preference when the OS theme changes or the tab regains focus.
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
    () => resolveTheme(mode, systemTheme),
    [mode, systemTheme],
  );

  useEffect(() => {
    window.localStorage.setItem(THEME_STORAGE_KEY, mode);
    applyThemeToDocument(resolvedTheme);
  }, [mode, resolvedTheme]);

  useEffect(() => {
    // Mirrors theme changes coming from another browser tab.
    const syncStoredMode = () => {
      setMode(readStoredTheme());
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

// Provides a single shared theme state for the entire application tree.
export function ThemeProvider({ children }: ThemeProviderProps) {
  const value = useThemeController();

  return createElement(ThemeContext.Provider, { value }, children);
}

// Reads the shared theme state created by ThemeProvider.
export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider.");
  }

  return context;
}
