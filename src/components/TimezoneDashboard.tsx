import { useMemo, useState } from "react";
import { TimezoneGrid } from "./TimezoneGrid";
import { VietnamClock } from "./VietnamClock";
import { useClock } from "../hooks/useClock";
import {
  US_TIMEZONES,
  VIETNAM_TIMEZONE,
  parseVietnamLocalTime,
  toDateTimeLocalValue,
  toZone,
} from "../utils/timezone";

export function TimezoneDashboard() {
  const now = useClock();
  const vietnamNow = toZone(now, VIETNAM_TIMEZONE.zone);
  const [customInput, setCustomInput] = useState(() =>
    toDateTimeLocalValue(vietnamNow),
  );
  const [mode, setMode] = useState<"live" | "custom">("live");

  const customVietnamTime = useMemo(
    () => parseVietnamLocalTime(customInput),
    [customInput],
  );
  const hasValidCustomTime = customVietnamTime.isValid;

  const activeVietnamTime =
    mode === "custom" && hasValidCustomTime ? customVietnamTime : vietnamNow;

  const handleUseCurrentTime = () => {
    setMode("live");
    setCustomInput(toDateTimeLocalValue(vietnamNow));
  };
  const isLiveMode = mode === "live";

  return (
    <>
      <section className="mt-8">
        <div className="panel-surface rounded-[2rem] p-6 shadow-panel md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold">
                Time Converter
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-token-subtle">
                Select a Vietnam local time to convert across US time zones, or
                switch back to live mode anytime.
              </p>
            </div>

            <div className="flex w-full max-w-xl flex-col gap-3 sm:flex-row sm:items-end">
              <label className="flex-1">
                <span className="mb-2 block text-xs font-medium uppercase tracking-[0.24em] text-token-muted">
                  Vietnam local time
                </span>
                <input
                  type="datetime-local"
                  value={customInput}
                  onChange={(event) => {
                    setCustomInput(event.target.value);
                    setMode("custom");
                  }}
                  className="panel-surface w-full rounded-xl px-4 py-3 font-mono text-sm text-token-text outline-none ring-0 transition focus:shadow-panel"
                />
              </label>

              <button
                type="button"
                onClick={handleUseCurrentTime}
                disabled={isLiveMode}
                className={`h-[46px] rounded-xl px-4 text-sm font-medium transition ${
                  isLiveMode
                    ? "cursor-not-allowed bg-black/10 text-token-muted"
                    : "bg-token-strong text-token-strong-contrast hover:opacity-90"
                }`}
              >
                Back To Current Time
              </button>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
            <span className="badge-soft rounded-full px-3 py-1.5 font-mono text-token-muted">
              {isLiveMode ? "Mode LIVE" : "Mode CUSTOM"}
            </span>
            {mode === "custom" && !hasValidCustomTime ? (
              <span className="rounded-full bg-red-100 px-3 py-1.5 font-mono text-red-600 dark:bg-red-500/20 dark:text-red-300">
                Invalid date/time selection
              </span>
            ) : null}
          </div>
        </div>
      </section>

      <section className="mt-8">
        <VietnamClock now={activeVietnamTime} />
      </section>

      <section className="mt-8">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold">
              United States Time Zones
            </h2>
            <p className="mt-1 text-sm text-token-subtle">
              Eastern, Central, Mountain, Pacific, Alaska, and Hawaii.
            </p>
          </div>
        </div>

        <TimezoneGrid
          items={US_TIMEZONES}
          now={activeVietnamTime}
          vietnamNow={activeVietnamTime}
        />
      </section>
    </>
  );
}
