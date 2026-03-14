import { useTheme } from "./hooks/useTheme";
import { TimezoneDashboard } from "./components/TimezoneDashboard";
import { AppearanceSwitch } from "./components/AppearanceSwitch";
import packageJson from "../package.json";

function App() {
  const { mode, resolvedTheme, setMode } = useTheme();
  const appVersion = packageJson.version;

  return (
    <main className="app-shell min-h-screen px-4 py-8 text-token-text transition-colors duration-500 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="panel-surface rounded-[2rem] p-6 shadow-panel backdrop-blur md:p-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
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
              <div className="mt-5 inline-flex items-center rounded-full bg-black/5 px-3 py-1 font-mono text-xs text-token-muted">
                Version {appVersion}
              </div>
            </div>

            <div className="lg:pt-1">
              <AppearanceSwitch
                mode={mode}
                resolvedTheme={resolvedTheme}
                onChange={setMode}
              />
            </div>
          </div>
        </section>

        <TimezoneDashboard />
      </div>
    </main>
  );
}

export default App;
