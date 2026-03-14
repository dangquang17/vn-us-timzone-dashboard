import { useClock } from "../hooks/useClock";
import { TimezoneGrid } from "./TimezoneGrid";
import { VietnamClock } from "./VietnamClock";
import { US_TIMEZONES, VIETNAM_TIMEZONE, toZone } from "../utils/timezone";

export function TimezoneDashboard() {
  const now = useClock();
  const vietnamNow = toZone(now, VIETNAM_TIMEZONE.zone);

  return (
    <>
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
    </>
  );
}
