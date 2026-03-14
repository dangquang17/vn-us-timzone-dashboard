export type ThemeMode = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

export const THEME_STORAGE_KEY = "vn-us-clock-theme";
const THEME_META_SELECTOR = 'meta[name="theme-color"]';
const THEME_COLOR_CSS_VAR = "--theme-browser";

// Normalizes any stored value into one of the supported theme modes.
export function parseThemeMode(value: string | null): ThemeMode {
  return value === "light" || value === "dark" || value === "system"
    ? value
    : "system";
}

// Reads the browser's current color-scheme preference.
export function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

// Resolves the final theme the app should render.
export function resolveTheme(
  mode: ThemeMode,
  systemTheme: ResolvedTheme,
): ResolvedTheme {
  return mode === "system" ? systemTheme : mode;
}

// Reads the user's saved theme mode from localStorage.
export function readStoredTheme(): ThemeMode {
  if (typeof window === "undefined") {
    return "system";
  }

  return parseThemeMode(window.localStorage.getItem(THEME_STORAGE_KEY));
}

// Applies the resolved theme to the document and syncs the browser UI color.
export function applyThemeToDocument(theme: ResolvedTheme) {
  const root = document.documentElement;
  const themeMeta = document.querySelector<HTMLMetaElement>(THEME_META_SELECTOR);

  root.dataset.theme = theme;
  root.style.colorScheme = theme;

  if (themeMeta) {
    const themeColor = getComputedStyle(root)
      .getPropertyValue(THEME_COLOR_CSS_VAR)
      .trim();

    if (themeColor) {
      themeMeta.setAttribute("content", themeColor);
    }
  }
}
