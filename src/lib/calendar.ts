// Every calendar decision lives here, pure and tested, so the component only renders.
import {
  addMonths,
  compareYearMonth,
  isIsoDate,
  monthGrid,
  yearMonthOf,
  type IsoDate,
  type YearMonth,
} from "./dates";

export type DayState = "link" | "ramble" | "dim"; // cyan link | bold white glow link | no link

export interface CalendarCell {
  date: IsoDate;
  state: DayState;
  isToday: boolean;
}

export interface CalendarView {
  month: YearMonth;
  weeks: (CalendarCell | null)[][];
  canGoBack: boolean;
  canGoForward: boolean;
}

export interface CalendarInput {
  today: IsoDate | null; // viewer's local date; null while rendering on the server
  buildDay: IsoDate; // stands in for today until the client knows it
  startDate: IsoDate;
  focusDate: IsoDate | null;
  rambleDates: ReadonlySet<IsoDate>;
  offsetMonths: number;
}

function clampMonth(month: YearMonth, low: YearMonth, high: YearMonth): YearMonth {
  if (compareYearMonth(month, low) < 0) return low;
  if (compareYearMonth(month, high) > 0) return high;
  return month;
}

function cellState(date: IsoDate, input: CalendarInput, lastLinkable: IsoDate): DayState {
  if (date < input.startDate) return "dim";
  if (date > lastLinkable) return "dim";
  if (input.rambleDates.has(date)) return "ramble";
  return "link";
}

export function calendarView(input: CalendarInput): CalendarView {
  if (!isIsoDate(input.startDate)) throw new Error(`invariant: bad startDate ${input.startDate}`);
  if (!isIsoDate(input.buildDay)) throw new Error(`invariant: bad buildDay ${input.buildDay}`);
  if (!Number.isInteger(input.offsetMonths)) throw new Error("invariant: offsetMonths not int");

  const lastLinkable = input.today ?? input.buildDay;
  const startMonth = yearMonthOf(input.startDate);
  // a viewer whose today is before the start date still sees the start month
  const lastMonth = clampMonth(yearMonthOf(lastLinkable), startMonth, { year: 9999, month: 12 });
  const base = clampMonth(yearMonthOf(input.focusDate ?? lastLinkable), startMonth, lastMonth);
  const month = clampMonth(addMonths(base, input.offsetMonths), startMonth, lastMonth);

  const weeks = monthGrid(month).map((week) =>
    week.map((date): CalendarCell | null => {
      if (date === null) return null;
      return {
        date,
        state: cellState(date, input, lastLinkable),
        isToday: input.today !== null && date === input.today,
      };
    }),
  );
  return {
    month,
    weeks,
    canGoBack: compareYearMonth(month, startMonth) > 0,
    canGoForward: compareYearMonth(month, lastMonth) < 0,
  };
}
