import { useEffect, useState } from "react";
import { DateTime } from "luxon";

export function useClock() {
  const [now, setNow] = useState(() => DateTime.now());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(DateTime.now());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  return now;
}
