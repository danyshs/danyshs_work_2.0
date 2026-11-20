"use client";
import { useState, useSyncExternalStore } from "react";
import { calendarView, type CalendarCell, type DayState } from "../lib/calendar";
import { localTodayIso, type IsoDate } from "../lib/dates";

interface BlogCalendarProps {
  startDate: IsoDate;
  buildDay: IsoDate;
  rambleDates: IsoDate[];
  focusDate: IsoDate | null;
}

const WEEKDAY_HEADERS = ["M", "T", "W", "T", "F", "S", "S"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const STATE_CLASS: Record<DayState, string> = {
  link: "text-cyan-900 hover:underline",
  ramble: "text-white font-bold ramble-glow hover:underline",
  dim: "text-cyan-500",
};

// "today" never changes while the page is open, so there is nothing to subscribe to
function subscribeNever(): () => void {
  return () => {};
}

function DayCell({ cell }: { cell: CalendarCell | null }) {
  if (cell === null) return <td className="border border-blue-400" />;
  const day = Number(cell.date.slice(8, 10));
  const cursor = cell.isToday ? " cal-cursor" : "";
  const className = `${STATE_CLASS[cell.state]}${cursor}`;
  return (
    <td className="border border-blue-400 text-center w-7 h-7">
      {cell.state === "dim" ? (
        <span className={className}>{day}</span>
      ) : (
        <a href={`/blog/${cell.date}`} className={className}>
          {day}
        </a>
      )}
    </td>
  );
}

export default function BlogCalendar({
  startDate,
  buildDay,
  rambleDates,
  focusDate,
}: BlogCalendarProps) {
  // null on the server: it renders buildDay's month with real links, no cursor
  const today = useSyncExternalStore(
    subscribeNever,
    () => localTodayIso(new Date()),
    () => null,
  );
  const [offsetMonths, setOffsetMonths] = useState(0);
  const view = calendarView({
    today,
    buildDay,
    startDate,
    focusDate,
    rambleDates: new Set(rambleDates),
    offsetMonths,
  });
  const monthName = MONTH_NAMES[view.month.month - 1] ?? "";
  const arrowClass = "px-2 disabled:opacity-25 enabled:hover:text-white";

  return (
    <table className="font-comp_pixel text-2xl text-cyan-900 border-collapse mx-auto">
      <thead>
        <tr>
          <th colSpan={7} className="pb-1">
            <button
              type="button"
              aria-label="Previous month"
              className={arrowClass}
              disabled={today === null || !view.canGoBack}
              onClick={() => setOffsetMonths((offset) => offset - 1)}
            >
              ◄
            </button>
            {monthName} {view.month.year}
            <button
              type="button"
              aria-label="Next month"
              className={arrowClass}
              disabled={today === null || !view.canGoForward}
              onClick={() => setOffsetMonths((offset) => offset + 1)}
            >
              ►
            </button>
          </th>
        </tr>
        <tr>
          {WEEKDAY_HEADERS.map((letter, index) => (
            <th key={index} className="border border-blue-400 w-7">
              {letter}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {view.weeks.map((week, weekIndex) => (
          <tr key={weekIndex}>
            {week.map((cell, dayIndex) => (
              <DayCell key={dayIndex} cell={cell} />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
