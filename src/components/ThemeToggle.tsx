import { ThemeMode } from "../hooks/useTheme";

type ThemeToggleProps = {
  mode: ThemeMode;
  resolvedTheme: "light" | "dark";
  onChange: (mode: ThemeMode) => void;
};

const options: Array<{ value: ThemeMode; label: string }> = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];

export function ThemeToggle({
  mode,
  resolvedTheme,
  onChange,
}: ThemeToggleProps) {
  return (
    <div className="panel-surface flex flex-col gap-3 rounded-full px-3 py-3 shadow-sm sm:flex-row sm:items-center sm:gap-2">
      <div className="flex items-center gap-2 px-2 text-sm text-token-muted">
        <span
          className={
            resolvedTheme === "dark" ? "text-token-accent" : "text-orange-500"
          }
        >
          {resolvedTheme === "dark" ? "●" : "○"}
        </span>
        <span>{mode === "system" ? `System (${resolvedTheme})` : mode}</span>
      </div>

      <div className="flex rounded-full bg-black/5 p-1">
        {options.map((option) => {
          const active = option.value === mode;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                active
                  ? "bg-token-strong text-token-strong-contrast shadow-sm"
                  : "text-token-muted hover:text-token-text"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
