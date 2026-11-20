import { expect, test } from "bun:test";
import { calendarView, type CalendarCell, type CalendarInput } from "./calendar";

function input(overrides: Partial<CalendarInput>): CalendarInput {
  return {
    today: null,
    buildDay: "2026-11-19",
    startDate: "2026-10-30",
    focusDate: null,
    rambleDates: new Set(),
    offsetMonths: 0,
    ...overrides,
  };
}

function cellsOf(view: ReturnType<typeof calendarView>): Map<string, CalendarCell> {
  const cells = new Map<string, CalendarCell>();
  for (const week of view.weeks) {
    for (const cell of week) if (cell !== null) cells.set(cell.date, cell);
  }
  return cells;
}

// before hydration the build day stands in for today: links up to it, no cursor anywhere
test("server render: build-day month, later days dim, no today", () => {
  const view = calendarView(input({}));
  expect(view.month).toEqual({ year: 2026, month: 11 });
  const cells = cellsOf(view);
  expect(cells.get("2026-11-19")?.state).toBe("link");
  expect(cells.get("2026-11-20")?.state).toBe("dim");
  expect([...cells.values()].some((cell) => cell.isToday)).toBe(false);
});

test("client render: today links with the cursor, tomorrow dim", () => {
  const cells = cellsOf(calendarView(input({ today: "2026-11-20" })));
  expect(cells.get("2026-11-20")).toEqual({ date: "2026-11-20", state: "link", isToday: true });
  expect(cells.get("2026-11-21")?.state).toBe("dim");
  expect(cells.get("2026-11-19")?.isToday).toBe(false);
});

test("a Ramble day glows; a day before the start is dim", () => {
  const view = calendarView(
    input({ rambleDates: new Set(["2026-10-30"]), focusDate: "2026-10-30" }),
  );
  const cells = cellsOf(view);
  expect(cells.get("2026-10-30")?.state).toBe("ramble");
  expect(cells.get("2026-10-29")?.state).toBe("dim");
  expect(cells.get("2026-10-31")?.state).toBe("link");
});

// one month of history here: October is the start month, November is today's
test("arrows stop at the start month and today's month; offsets clamp", () => {
  const atToday = calendarView(input({ today: "2026-11-20" }));
  expect(atToday.canGoForward).toBe(false);
  expect(atToday.canGoBack).toBe(true);
  const atStart = calendarView(input({ today: "2026-11-20", offsetMonths: -1 }));
  expect(atStart.month).toEqual({ year: 2026, month: 10 });
  expect(atStart.canGoBack).toBe(false);
  expect(atStart.canGoForward).toBe(true);
  const pastStart = calendarView(input({ today: "2026-11-20", offsetMonths: -40 }));
  expect(pastStart.month).toEqual({ year: 2026, month: 10 });
  const pastToday = calendarView(input({ today: "2026-11-20", offsetMonths: 5 }));
  expect(pastToday.month).toEqual({ year: 2026, month: 11 });
});

test("focusDate opens its own month", () => {
  const view = calendarView(input({ today: "2026-11-20", focusDate: "2026-10-31" }));
  expect(view.month).toEqual({ year: 2026, month: 10 });
});

// a viewer whose clock is behind the first post still gets a usable calendar
test("today before the start date opens the start month", () => {
  const view = calendarView(
    input({ today: "2026-09-01", startDate: "2026-10-30", buildDay: "2026-10-30" }),
  );
  expect(view.month).toEqual({ year: 2026, month: 10 });
  expect(view.canGoBack).toBe(false);
  expect(view.canGoForward).toBe(false);
});
