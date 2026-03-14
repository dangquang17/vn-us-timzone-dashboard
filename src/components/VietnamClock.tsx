import { memo } from "react";
import { DateTime } from "luxon";
import { TimeCard } from "./TimeCard";
import { VIETNAM_TIMEZONE } from "../utils/timezone";

type VietnamClockProps = {
  now: DateTime;
};

function VietnamClockComponent({ now }: VietnamClockProps) {
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

export const VietnamClock = memo(VietnamClockComponent);
