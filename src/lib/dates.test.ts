import { expect, test } from "bun:test";
import {
  addDays,
  addMonths,
  compareYearMonth,
  formatDate,
  isIsoDate,
  localTodayIso,
  monthGrid,
  utcTodayIso,
} from "./dates";

// real calendar days only; the pattern alone would let 2026-02-29 through
test("isIsoDate accepts real days and rejects the rest", () => {
  expect(isIsoDate("2026-11-19")).toBe(true);
  expect(isIsoDate("2024-02-29")).toBe(true);
  for (const bad of ["2026-02-29", "2026-13-01", "2026-1-1", "", "../x"]) {
    expect(isIsoDate(bad)).toBe(false);
  }
});

// month and year rollover, and a DST start that a local-time Date would get wrong
test("addDays crosses month, year and DST boundaries", () => {
  expect(addDays("2026-11-30", 1)).toBe("2026-12-01");
  expect(addDays("2026-12-31", 1)).toBe("2027-01-01");
  expect(addDays("2026-03-08", 1)).toBe("2026-03-09");
  expect(addDays("2026-03-01", -1)).toBe("2026-02-28");
});

// Monday-first: Nov 2026 starts on a Sunday, Feb 2027 on a Monday with exactly 4 weeks
test("monthGrid pads to Monday-first weeks of 7", () => {
  const november = monthGrid({ year: 2026, month: 11 });
  expect(november.length).toBe(6);
  expect(november[0]).toEqual([null, null, null, null, null, null, "2026-11-01"]);
  expect(november[5]?.[0]).toBe("2026-11-30");
  const february = monthGrid({ year: 2027, month: 2 });
  expect(february.length).toBe(4);
  expect(february[0]?.[0]).toBe("2027-02-01");
  expect(february[3]?.[6]).toBe("2027-02-28");
  for (const week of [...november, ...february]) expect(week.length).toBe(7);
});

// bun test runs in UTC; Eastern time makes 23:30 local a different UTC day, so a mix-up shows
test("localTodayIso reads local fields, utcTodayIso reads UTC fields", () => {
  const saved = process.env.TZ;
  try {
    process.env.TZ = "America/New_York";
    const lateEvening = new Date(2026, 10, 19, 23, 30);
    expect(lateEvening.getUTCDate()).toBe(20); // the zone change took effect
    expect(localTodayIso(lateEvening)).toBe("2026-11-19");
    expect(utcTodayIso(lateEvening)).toBe("2026-11-20");
  } finally {
    process.env.TZ = saved;
  }
  expect(utcTodayIso(new Date(Date.UTC(2026, 10, 19, 23, 30)))).toBe("2026-11-19");
});

test("formatDate day and feed styles", () => {
  expect(formatDate("2026-11-19", "day")).toBe("Thursday, November 19, 2026");
  expect(formatDate("2026-11-19", "feed")).toBe("Thu · November 19, 2026");
});

test("addMonths and compareYearMonth across a year end", () => {
  expect(addMonths({ year: 2026, month: 12 }, 1)).toEqual({ year: 2027, month: 1 });
  expect(addMonths({ year: 2027, month: 1 }, -1)).toEqual({ year: 2026, month: 12 });
  expect(addMonths({ year: 2026, month: 11 }, -23)).toEqual({ year: 2024, month: 12 });
  expect(compareYearMonth({ year: 2026, month: 12 }, { year: 2027, month: 1 })).toBeLessThan(0);
  expect(compareYearMonth({ year: 2027, month: 1 }, { year: 2026, month: 12 })).toBeGreaterThan(0);
  expect(compareYearMonth({ year: 2027, month: 1 }, { year: 2027, month: 1 })).toBe(0);
});
