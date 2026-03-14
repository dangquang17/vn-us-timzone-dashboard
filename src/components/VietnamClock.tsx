import { DateTime } from "luxon";
import { TimeCard } from "./TimeCard";
import { VIETNAM_TIMEZONE } from "../utils/timezone";

type VietnamClockProps = {
  now: DateTime;
};

export function VietnamClock({ now }: VietnamClockProps) {
  return (
    <TimeCard
      title={VIETNAM_TIMEZONE.name}
      shortLabel={VIETNAM_TIMEZONE.shortLabel}
      city={VIETNAM_TIMEZONE.city}
      now={now}
      vietnamNow={now}
      featured
    />
  );
}
