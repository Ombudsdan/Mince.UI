import type { LeaveEntry, YearAllowance } from "@/types";
import { LeaveDuration } from "@/types";

export function formatYearWindow(ya: YearAllowance): string {
  const sm = ya.holidayStartMonth ?? 1;
  const start = new Date(ya.year, sm - 1, 1);
  const end = new Date(ya.year + 1, sm - 1, 0);
  const opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", year: "numeric" };
  return `${start.toLocaleDateString("en-GB", opts)} – ${end.toLocaleDateString("en-GB", opts)}`;
}

export function countWorkingDays(
  startDate: string,
  endDate: string,
  nonWorkingDays: number[],
  bankHolidays: string[]
): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  let count = 0;
  const cur = new Date(start);
  while (cur <= end) {
    const dow = cur.getDay();
    const iso = cur.toISOString().slice(0, 10);
    if (!nonWorkingDays.includes(dow) && !bankHolidays.includes(iso)) count++;
    cur.setDate(cur.getDate() + 1);
  }
  return count;
}

export function getActiveYearAllowance(allowances: YearAllowance[]): YearAllowance | undefined {
  const today = new Date();
  const notDeactivated = allowances.filter((ya) => ya.active !== false);
  const search = notDeactivated.length > 0 ? notDeactivated : allowances;

  const lookahead = new Date(today);
  lookahead.setDate(lookahead.getDate() + 60);

  const candidates = search.filter((ya) => {
    const sm = ya.holidayStartMonth ?? 1;
    const start = new Date(ya.year, sm - 1, 1);
    const end = new Date(ya.year + 1, sm - 1, 1);
    const containsToday = today >= start && today < end;
    const startsVerySoon = start > today && start <= lookahead;
    return containsToday || startsVerySoon;
  });

  if (candidates.length > 0) return candidates.sort((a, b) => b.year - a.year)[0];

  const past = search.filter(
    (ya) => today >= new Date(ya.year, (ya.holidayStartMonth ?? 1) - 1, 1)
  );
  if (past.length > 0) return past.sort((a, b) => b.year - a.year)[0];
  return [...search].sort((a, b) => a.year - b.year)[0];
}

export function yearAllowanceDates(
  year: number,
  holidayStartMonth: number
): { startDate: string; endDate: string } {
  const start = new Date(Date.UTC(year, holidayStartMonth - 1, 1));
  const end = new Date(Date.UTC(year + 1, holidayStartMonth - 1, 0));
  return { startDate: toIsoDate(start), endDate: toIsoDate(end) };
}

export function yearAllowancesOverlap(
  a: { startDate: string; endDate: string },
  b: { startDate: string; endDate: string }
): boolean {
  return a.startDate <= b.endDate && b.startDate <= a.endDate;
}

export function getHolidayYearBounds(holidayStartMonth: number): { start: Date; end: Date } {
  const now = new Date();
  const year = now.getMonth() + 1 >= holidayStartMonth ? now.getFullYear() : now.getFullYear() - 1;
  const start = new Date(Date.UTC(year, holidayStartMonth - 1, 1));
  const end = new Date(Date.UTC(year + 1, holidayStartMonth - 1, 0));
  return { start, end };
}

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

export function getEntryForDate(date: string, entries: LeaveEntry[]): LeaveEntry | undefined {
  return entries.find((e) => {
    const s = new Date(e.startDate);
    const en = new Date(e.endDate);
    const d = new Date(date);
    return d >= s && d <= en;
  });
}

export function getEntriesForDate(date: string, entries: LeaveEntry[]): LeaveEntry[] {
  const matches = entries.filter((e) => {
    const s = new Date(e.startDate);
    const en = new Date(e.endDate);
    const d = new Date(date);
    return d >= s && d <= en;
  });
  return matches.slice(0, 2);
}

export function isNonWorkingDay(date: string, nonWorkingDays: number[]): boolean {
  return nonWorkingDays.includes(new Date(date).getDay());
}

export function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function getEntryDuration(entry: LeaveEntry): LeaveDuration {
  if (entry.duration) return entry.duration;
  if (entry.halfDay) {
    return entry.halfDayPeriod === "am" ? LeaveDuration.HalfMorning : LeaveDuration.HalfAfternoon;
  }
  return LeaveDuration.Full;
}

export interface MonthYear {
  year: number;
  month: number;
}

export function getLeaveDataBounds(
  users: { entries: LeaveEntry[]; yearAllowances: YearAllowance[] }[]
): { min: MonthYear; max: MonthYear } {
  const today = new Date();
  const todayMY: MonthYear = { year: today.getFullYear(), month: today.getMonth() };

  let minDateStr: string | null = null;
  let maxEndDateStr: string | null = null;

  for (const user of users) {
    for (const entry of user.entries) {
      if (!minDateStr || entry.startDate < minDateStr) {
        minDateStr = entry.startDate;
      }
    }
    for (const ya of user.yearAllowances) {
      const sm = ya.holidayStartMonth;
      const { endDate } = yearAllowanceDates(ya.year, sm);
      if (!maxEndDateStr || endDate > maxEndDateStr) {
        maxEndDateStr = endDate;
      }
    }
  }

  const min: MonthYear = minDateStr
    ? {
        year: parseInt(minDateStr.slice(0, 4), 10),
        month: parseInt(minDateStr.slice(5, 7), 10) - 1,
      }
    : todayMY;

  const max: MonthYear = maxEndDateStr
    ? {
        year: parseInt(maxEndDateStr.slice(0, 4), 10),
        month: parseInt(maxEndDateStr.slice(5, 7), 10) - 1,
      }
    : todayMY;

  const maxIsBeforeMin = max.year < min.year || (max.year === min.year && max.month < min.month);
  return { min, max: maxIsBeforeMin ? { ...min } : max };
}

export function countEntryDays(
  entry: LeaveEntry,
  nonWorkingDays: number[],
  bankHolidays: string[]
): number {
  const duration = getEntryDuration(entry);
  if (duration !== LeaveDuration.Full) return 0.5;
  return countWorkingDays(entry.startDate, entry.endDate, nonWorkingDays, bankHolidays);
}
