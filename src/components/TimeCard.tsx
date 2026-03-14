import { DateTime } from "luxon";
import {
  differenceFromVietnam,
  formatDate,
  formatTime,
  formatUtcOffset,
} from "../utils/timezone";

type TimeCardProps = {
  title: string;
  shortLabel: string;
  city: string;
  now: DateTime;
  vietnamNow: DateTime;
  featured?: boolean;
};

export function TimeCard({
  title,
  shortLabel,
  city,
  now,
  vietnamNow,
  featured = false,
}: TimeCardProps) {
  const containerClass = featured
    ? "featured-panel relative overflow-hidden rounded-[2rem] p-6 shadow-panel ring-1 backdrop-blur md:p-8"
    : "panel-surface rounded-[1.75rem] p-5 shadow-panel backdrop-blur transition-transform duration-300 hover:-translate-y-1";

  return (
    <article className={containerClass}>
      {featured ? (
        <div className="pointer-events-none absolute inset-0 bg-mesh opacity-100" />
      ) : null}

      <div className="relative flex h-full flex-col gap-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-token-muted">
              {shortLabel}
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold text-token-text">
              {title}
            </h2>
            <p className="mt-1 text-sm text-token-subtle">{city}</p>
          </div>

          <div className="badge-strong rounded-full px-3 py-1 font-mono text-xs">
            {featured ? "Featured" : shortLabel}
          </div>
        </div>

        <div className="badge-soft inline-flex w-fit rounded-full px-3 py-1 font-mono text-xs">
          {formatUtcOffset(now)}
        </div>

        <div className="space-y-2">
          <p
            className={
              featured
                ? "font-mono text-4xl font-medium tracking-tight text-token-text sm:text-5xl"
                : "font-mono text-3xl font-medium tracking-tight text-token-text"
            }
          >
            {formatTime(now)}
          </p>
          <p className="text-sm text-token-subtle">{formatDate(now)}</p>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3">
          <p className="max-w-[18rem] text-sm text-token-muted">
            {differenceFromVietnam(now, vietnamNow)}
          </p>
          <div className="separator-line h-px flex-1" />
        </div>
      </div>
    </article>
  );
}
