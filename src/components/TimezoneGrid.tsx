import { memo } from "react";
import { DateTime } from "luxon";
import { TimeCard } from "./TimeCard";
import { RevealOnScroll } from "./RevealOnScroll";
import { TimezoneItem, toZone } from "../utils/timezone";

type TimezoneGridProps = {
  items: TimezoneItem[];
  now: DateTime;
  vietnamNow: DateTime;
};

function TimezoneGridComponent({
  items,
  now,
  vietnamNow,
}: TimezoneGridProps) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item, index) => (
        <RevealOnScroll key={item.zone} delayMs={index * 45} speed="fast">
          <TimeCard
            title={item.name}
            shortLabel={item.shortLabel}
            city={item.city}
            now={toZone(now, item.zone)}
            vietnamNow={vietnamNow}
          />
        </RevealOnScroll>
      ))}
    </div>
  );
}

export const TimezoneGrid = memo(TimezoneGridComponent);
