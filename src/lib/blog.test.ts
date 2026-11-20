import { afterEach, expect, test } from "bun:test";
import path from "node:path";
import { mkdir, mkdtemp, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import {
  assertCountWithin,
  dayPageDates,
  excerptOf,
  EXCERPT_LENGTH_MAX,
  loadBlogIndex,
  memoizeUntilRejected,
  pageCount,
} from "./blog";

const FIXTURE = path.join(import.meta.dir, "__fixtures__", "blog", "posts");
const NOW = new Date(Date.UTC(2026, 10, 19, 12));
const temporaryDirs: string[] = [];

afterEach(async () => {
  for (const dir of temporaryDirs.splice(0)) await rm(dir, { recursive: true, force: true });
});

// a posts/ dir holding only the given files, relative path → contents
async function postsDir(files: Record<string, string>): Promise<string> {
  const dir = await mkdtemp(path.join(tmpdir(), "blog-test-"));
  temporaryDirs.push(dir);
  for (const [relative, contents] of Object.entries(files)) {
    await mkdir(path.dirname(path.join(dir, relative)), { recursive: true });
    await writeFile(path.join(dir, relative), contents);
  }
  return dir;
}

const GOOD_DAY = { "days/2026-11-01.mdx": "fine\n" };

test("fixture index: start date, order, titles, tags, Ramble dates", async () => {
  const index = await loadBlogIndex({ postsDir: FIXTURE, nowUtc: NOW });
  expect(index.startDate).toBe("2026-10-30"); // the old Ramble predates every entry
  expect(index.buildDay).toBe("2026-11-19");
  expect(index.entries.map((entry) => entry.date)).toEqual([
    "2026-11-18",
    "2026-11-10",
    "2026-11-02",
  ]);
  expect(index.entries[1]?.title).toBe("Rainy day");
  expect(index.entries[0]?.title).toBeNull();
  expect(index.entries[0]?.tags).toEqual(["code", "rain"]);
  expect(index.tags).toEqual(["code", "rain", "winter"]);
  expect(index.rambles.map((ramble) => [ramble.slug, ramble.date])).toEqual([
    ["first-snow", "2026-11-10"],
    ["old-thought", "2026-10-30"],
  ]);
});

// each bad input must stop the build and name the file
test("bad posts fail the build", async () => {
  const cases: [Record<string, string>, RegExp][] = [
    [{}, /no daily entries/],
    [{ ...GOOD_DAY, "days/2026-1-1.mdx": "x" }, /2026-1-1\.mdx: name must be YYYY-MM-DD/],
    [{ "days/2026-11-01.mdx": "---\ndate: 2026-11-01\n---\nx" }, /unknown frontmatter key "date"/],
    [{ "days/2026-11-01.mdx": '---\ntitle: ""\n---\nx' }, /title must be a non-empty string/],
    [{ "days/2026-11-01.mdx": "---\ntags: rain\n---\nx" }, /tags must be a list/],
    [{ ...GOOD_DAY, "rambles/r.mdx": "---\ntitle: R\n---\nx" }, /rambles\/r\.mdx: .*needs date/],
    [{ ...GOOD_DAY, "rambles/r.mdx": "---\ndate: 2026-11-01\n---\nx" }, /needs a title/],
    [{ ...GOOD_DAY, "rambles/_empty.mdx": "---\ntitle: R\ndate: 2026-11-01\n---\nx" }, /_empty\.mdx: name is reserved/],
    [{ "days/2026-11-01.mdx": "---\ntags: [Bad Tag]\n---\nx" }, /bad tag "Bad Tag"/],
    [{ "days/2026-11-21.mdx": "x" }, /dated 2026-11-21, after 2026-11-20/],
  ];
  for (const [files, message] of cases) {
    const dir = await postsDir(files);
    await expect(loadBlogIndex({ postsDir: dir, nowUtc: NOW })).rejects.toThrow(message);
  }
});

// one day of grace for a writer ahead of UTC, and no more
test("build day + 1 passes, + 2 fails", async () => {
  const ahead = await postsDir({ "days/2026-11-20.mdx": "x" });
  const index = await loadBlogIndex({ postsDir: ahead, nowUtc: NOW });
  expect(index.entries[0]?.date).toBe("2026-11-20");
  const tooFar = await postsDir({ "days/2026-11-21.mdx": "x" });
  const rejection = loadBlogIndex({ postsDir: tooFar, nowUtc: NOW });
  await expect(rejection).rejects.toThrow(/after 2026-11-20/);
});

test("excerptOf the fixture body: prose only, cut on a word", async () => {
  const source = await readFile(path.join(FIXTURE, "days", "2026-11-02.mdx"), "utf8");
  const excerpt = excerptOf(source);
  expect(excerpt.startsWith("Walked to the corner store in the rain")).toBe(true);
  for (const gone of ["#", "heading", "example.com", "import", "hidden"]) {
    expect(excerpt.includes(gone)).toBe(false);
  }
  expect(excerpt.endsWith("…")).toBe(true);
  expect(Array.from(excerpt).length).toBeLessThanOrEqual(EXCERPT_LENGTH_MAX + 1);
});

test("excerptOf edge cases: short, one long word, emoji at the cut", () => {
  expect(excerptOf("Short day.")).toBe("Short day.");
  expect(excerptOf("b".repeat(EXCERPT_LENGTH_MAX))).toBe("b".repeat(EXCERPT_LENGTH_MAX));
  // 200 = 28 words of 7 + 4: the cut lands mid-word and backs up to the last whole word
  const words = excerptOf("abcdef ".repeat(40));
  expect(words).toBe("abcdef ".repeat(28).trimEnd() + "…");
  expect(excerptOf("a".repeat(250))).toBe("a".repeat(EXCERPT_LENGTH_MAX) + "…");
  const emoji = excerptOf("a".repeat(EXCERPT_LENGTH_MAX - 1) + "😀😀😀");
  expect(emoji).toBe("a".repeat(EXCERPT_LENGTH_MAX - 1) + "😀…");
});

// emphasis markers inside words and arithmetic must not be eaten; inline HTML is dropped
test("excerptOf keeps underscores and asterisks, drops raw HTML", () => {
  expect(excerptOf("the snake_case_name and 2*3*4 stay")).toBe(
    "the snake_case_name and 2*3*4 stay",
  );
  expect(excerptOf("a *real* emphasis")).toBe("a real emphasis");
  expect(excerptOf("before <span>inner</span> after")).toBe("before inner after");
  expect(excerptOf("<div>block html</div>\n\nprose")).toBe("prose");
});

test("pageCount rounds up and never drops below 1", () => {
  expect([0, 1, 10, 11, 20, 21].map(pageCount)).toEqual([1, 1, 1, 2, 2, 3]);
});

test("dayPageDates runs to the day after the build day, and is capped", () => {
  const dates = dayPageDates("2026-11-19", "2026-11-19");
  expect(dates.length).toBe(2);
  expect(dates[0]).toBe("2026-11-19");
  expect(dates[1]).toBe("2026-11-20");
  expect(() => dayPageDates("2000-01-01", "2026-11-19")).toThrow(/DAY_PAGE_COUNT_MAX/);
});

test("assertCountWithin passes at the limit and names the constant past it", () => {
  expect(() => assertCountWithin("tags", 5, 5, "TAG_COUNT_MAX")).not.toThrow();
  expect(() => assertCountWithin("tags", 6, 5, "TAG_COUNT_MAX")).toThrow(/raise TAG_COUNT_MAX/);
});

// the production memo: shared while pending or resolved, dropped once rejected
test("loadBlogIndex is memoized only in production", async () => {
  const environment = process.env as Record<string, string | undefined>;
  const saved = environment.NODE_ENV;
  try {
    environment.NODE_ENV = "production";
    const first = loadBlogIndex();
    expect(loadBlogIndex()).toBe(first);
    await first.catch(() => undefined); // real posts/ may have no entries yet
    environment.NODE_ENV = "test";
    const second = loadBlogIndex();
    const third = loadBlogIndex();
    expect(second).not.toBe(third);
    await Promise.allSettled([second, third]);
  } finally {
    environment.NODE_ENV = saved;
  }
});

test("memoizeUntilRejected drops a rejected load", async () => {
  let calls = 0;
  const load = memoizeUntilRejected(() => {
    calls += 1;
    return calls === 1 ? Promise.reject(new Error("first")) : Promise.resolve(calls);
  });
  await expect(load()).rejects.toThrow("first");
  expect(await load()).toBe(2);
  expect(await load()).toBe(2);
  expect(calls).toBe(2);
});

// MDX pages must compile the body only; letting next-mdx-remote parse frontmatter again
// would run a second parser with different rules
test("no blog route asks next-mdx-remote to parse frontmatter", async () => {
  const root = path.join(import.meta.dir, "..", "app", "blog");
  const files = (await readdir(root, { recursive: true })).filter((name) => name.endsWith(".tsx"));
  expect(files.length).toBeGreaterThanOrEqual(5);
  for (const file of files) {
    const source = await readFile(path.join(root, file), "utf8");
    expect(source.includes("parseFrontmatter: true")).toBe(false);
  }
});
