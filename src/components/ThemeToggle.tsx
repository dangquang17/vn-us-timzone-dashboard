import { memo } from "react";
import { ThemeMode } from "../utils/theme";

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

function formatModeLabel(mode: ThemeMode) {
  return mode === "system" ? "System" : mode[0].toUpperCase() + mode.slice(1);
}

function ThemeToggleComponent({
  mode,
  resolvedTheme,
  onChange,
}: ThemeToggleProps) {
  const resolvedLabel = resolvedTheme === "dark" ? "Dark" : "Light";
  const modeLabel = formatModeLabel(mode);

  return (
    <div className="w-full max-w-[24rem]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-token-muted">
            Appearance
          </p>
          <p className="mt-1 text-sm text-token-subtle">
            Switch light, dark, or follow your system.
          </p>
        </div>
        <div className="badge-soft hidden items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[11px] sm:inline-flex">
          <span className={resolvedTheme === "dark" ? "text-orange-400" : "text-orange-500"}>
            {resolvedTheme === "dark" ? "Night" : "Day"}
          </span>
          <span>{resolvedLabel}</span>
        </div>
      </div>

      <div className="panel-surface mt-3 grid grid-cols-3 rounded-[1.15rem] p-1.5 shadow-sm">
        {options.map((option) => {
          const active = option.value === mode;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              aria-pressed={active}
              className={`rounded-[0.95rem] px-3 py-3 text-sm font-medium transition ${
                active
                  ? "bg-token-strong text-token-strong-contrast shadow-sm"
                  : "text-token-muted hover:bg-black/5 hover:text-token-text"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-token-subtle">
        <span className="badge-soft rounded-full px-3 py-1.5 font-mono">
          Mode {modeLabel}
        </span>
        <span className="badge-soft rounded-full px-3 py-1.5 font-mono">
          Active {resolvedLabel}
        </span>
      </div>
    </div>
  );
}

export const ThemeToggle = memo(ThemeToggleComponent);
