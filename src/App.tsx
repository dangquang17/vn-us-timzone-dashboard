import { useClock } from "./hooks/useClock";
import { useTheme } from "./hooks/useTheme";
import { TimezoneGrid } from "./components/TimezoneGrid";
import { ThemeToggle } from "./components/ThemeToggle";
import { VietnamClock } from "./components/VietnamClock";
import { US_TIMEZONES, VIETNAM_TIMEZONE, toZone } from "./utils/timezone";

function App() {
  const now = useClock();
  const { mode, resolvedTheme, setMode } = useTheme();
  const vietnamNow = toZone(now, VIETNAM_TIMEZONE.zone);

  return (
    <main className="app-shell min-h-screen px-4 py-8 text-token-text transition-colors duration-500 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="panel-surface rounded-[2rem] p-6 shadow-panel backdrop-blur md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-token-muted">
                Live world clock
              </p>
              <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
                Vietnam & US Timezone Dashboard
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-token-subtle">
                A real-time dashboard for Vietnam and the six major United
                States time zones, updating every second with local time, date,
                and timezone offset.
              </p>
            </div>

            <ThemeToggle
              mode={mode}
              resolvedTheme={resolvedTheme}
              onChange={setMode}
            />
          </div>
        </section>

        <section className="mt-8">
          <VietnamClock now={vietnamNow} />
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

          <TimezoneGrid items={US_TIMEZONES} now={now} vietnamNow={vietnamNow} />
        </section>
      </div>
    </main>
  );
}

export default App;
