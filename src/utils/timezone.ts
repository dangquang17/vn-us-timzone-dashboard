import { DateTime } from "luxon";

export type TimezoneItem = {
  name: string;
  shortLabel: string;
  zone: string;
  city: string;
};

export const VIETNAM_TIMEZONE: TimezoneItem = {
  name: "Vietnam Time",
  shortLabel: "ICT",
  zone: "Asia/Ho_Chi_Minh",
  city: "Ho Chi Minh City",
};

export const US_TIMEZONES: TimezoneItem[] = [
  {
    name: "Eastern Time",
    shortLabel: "ET",
    zone: "America/New_York",
    city: "New York",
  },
  {
    name: "Central Time",
    shortLabel: "CT",
    zone: "America/Chicago",
    city: "Chicago",
  },
  {
    name: "Mountain Time",
    shortLabel: "MT",
    zone: "America/Denver",
    city: "Denver",
  },
  {
    name: "Pacific Time",
    shortLabel: "PT",
    zone: "America/Los_Angeles",
    city: "Los Angeles",
  },
  {
    name: "Alaska Time",
    shortLabel: "AKT",
    zone: "America/Anchorage",
    city: "Anchorage",
  },
  {
    name: "Hawaii Time",
    shortLabel: "HT",
    zone: "Pacific/Honolulu",
    city: "Honolulu",
  },
];

export function toZone(now: DateTime, zone: string) {
  return now.setZone(zone);
}

export function formatTime(now: DateTime) {
  return now.toFormat("hh:mm:ss a");
}

export function formatDate(now: DateTime) {
  return now.toFormat("cccc, dd LLL yyyy");
}

export function formatUtcOffset(now: DateTime) {
  const offsetHours = now.offset / 60;
  const sign = offsetHours >= 0 ? "+" : "-";
  return `UTC ${sign}${Math.abs(offsetHours)}`;
}

export function differenceFromVietnam(now: DateTime, vietnamNow: DateTime) {
  const diffInHours = Math.round(now.offset / 60 - vietnamNow.offset / 60);

  if (diffInHours === 0) {
    return "Same as Vietnam";
  }

  const direction = diffInHours > 0 ? "ahead of" : "behind";
  const absoluteHours = Math.abs(diffInHours);
  const unit = absoluteHours === 1 ? "hour" : "hours";

  return `${absoluteHours} ${unit} ${direction} Vietnam`;
}
