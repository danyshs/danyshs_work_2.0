// Calendar dates as "YYYY-MM-DD" strings. No Node imports: the client calendar uses this.
// All arithmetic goes through Date.UTC so the viewer's time zone and DST can't shift a day.

export type IsoDate = string;

export interface YearMonth {
  year: number;
  month: number; // 1..12
}

const ISO_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
const DAY_MS = 24 * 60 * 60 * 1000;
const DAYS_PER_WEEK = 7;
const WEEKS_PER_MONTH_MAX = 6;

function pad2(value: number): string {
  return String(value).padStart(2, "0");
}

function isoFromUtcMs(timeMs: number): IsoDate {
  const date = new Date(timeMs);
  return `${date.getUTCFullYear()}-${pad2(date.getUTCMonth() + 1)}-${pad2(date.getUTCDate())}`;
}

function utcMsOf(date: IsoDate): number {
  const match = ISO_DATE_PATTERN.exec(date);
  if (match === null) throw new Error(`invariant: not an IsoDate: "${date}"`);
  return Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
}

// pattern AND a real calendar day: Date.UTC rolls 2026-02-29 over to March, so round-trip it
export function isIsoDate(value: string): boolean {
  if (!ISO_DATE_PATTERN.test(value)) return false;
  return isoFromUtcMs(utcMsOf(value)) === value;
}

export function addDays(date: IsoDate, days: number): IsoDate {
  if (!isIsoDate(date)) throw new Error(`invariant: not an IsoDate: "${date}"`);
  if (!Number.isInteger(days)) throw new Error(`invariant: days must be an integer: ${days}`);
  return isoFromUtcMs(utcMsOf(date) + days * DAY_MS);
}

export function yearMonthOf(date: IsoDate): YearMonth {
  if (!isIsoDate(date)) throw new Error(`invariant: not an IsoDate: "${date}"`);
  return { year: Number(date.slice(0, 4)), month: Number(date.slice(5, 7)) };
}

export function addMonths(yearMonth: YearMonth, months: number): YearMonth {
  if (!Number.isInteger(months)) throw new Error(`invariant: months must be an integer`);
  const index = yearMonth.year * 12 + (yearMonth.month - 1) + months;
  return { year: Math.floor(index / 12), month: (index % 12) + 1 };
}

export function compareYearMonth(a: YearMonth, b: YearMonth): number {
  return a.year * 12 + a.month - (b.year * 12 + b.month);
}

// weeks of 7 cells, Monday first; null pads the days outside the month
export function monthGrid(yearMonth: YearMonth): (IsoDate | null)[][] {
  const { year, month } = yearMonth;
  if (month < 1 || month > 12) throw new Error(`invariant: month out of range: ${month}`);
  const firstMs = Date.UTC(year, month - 1, 1);
  const dayCount = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const leadCount = (new Date(firstMs).getUTCDay() + 6) % DAYS_PER_WEEK; // Sunday=0 → 6
  const cells: (IsoDate | null)[] = Array.from({ length: leadCount }, () => null);
  for (let day = 1; day <= dayCount; day += 1) {
    cells.push(`${year}-${pad2(month)}-${pad2(day)}`);
  }
  while (cells.length % DAYS_PER_WEEK !== 0) cells.push(null);
  const weeks: (IsoDate | null)[][] = [];
  for (let start = 0; start < cells.length; start += DAYS_PER_WEEK) {
    weeks.push(cells.slice(start, start + DAYS_PER_WEEK));
  }
  if (weeks.length < 4 || weeks.length > WEEKS_PER_MONTH_MAX) {
    throw new Error(`invariant: ${weeks.length} weeks in ${year}-${month}`);
  }
  return weeks;
}

// the viewer's own calendar day; never parse an ISO string through Date (that reads as UTC)
export function localTodayIso(now: Date): IsoDate {
  return `${now.getFullYear()}-${pad2(now.getMonth() + 1)}-${pad2(now.getDate())}`;
}

export function utcTodayIso(now: Date): IsoDate {
  return isoFromUtcMs(now.getTime());
}

const DAY_FORMAT = new Intl.DateTimeFormat("en-US", {
  timeZone: "UTC",
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});
const FEED_WEEKDAY_FORMAT = new Intl.DateTimeFormat("en-US", {
  timeZone: "UTC",
  weekday: "short",
});
const FEED_DATE_FORMAT = new Intl.DateTimeFormat("en-US", {
  timeZone: "UTC",
  year: "numeric",
  month: "long",
  day: "numeric",
});

// "Thursday, November 19, 2026" | "Thu · November 19, 2026"
export function formatDate(date: IsoDate, style: "day" | "feed"): string {
  const timeMs = utcMsOf(date);
  switch (style) {
    case "day":
      return DAY_FORMAT.format(timeMs);
    case "feed":
      return `${FEED_WEEKDAY_FORMAT.format(timeMs)} · ${FEED_DATE_FORMAT.format(timeMs)}`;
  }
}
