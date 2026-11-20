// Daily entries (posts/days/YYYY-MM-DD.mdx) and Rambles (posts/rambles/<slug>.mdx).
// Server only: reads the filesystem. Every check runs at build time and throws with the file.
import path from "node:path";
import { readdir, readFile } from "node:fs/promises";
import { parse as parseYaml } from "yaml";
import { fromMarkdown } from "mdast-util-from-markdown";
import { toString as mdastToString } from "mdast-util-to-string";
import { addDays, isIsoDate, utcTodayIso, type IsoDate } from "./dates";
import { isValidSlug } from "./posts";

const POSTS_DIRECTORY = path.join(process.cwd(), "posts");
export const DAILY_ENTRY_COUNT_MAX = 4000;
export const RAMBLE_COUNT_MAX = 200;
export const ENTRIES_PER_PAGE = 10;
export const EXCERPT_LENGTH_MAX = 200; // code points
export const TAG_COUNT_MAX = 100;
export const TAG_LENGTH_MAX = 32;
export const DAYS_AHEAD = 1; // daily rebuild keeps today built; +1 covers time zones ahead of UTC
export const DAY_PAGE_COUNT_MAX = 5000;
// export refuses an empty generateStaticParams; the page 404s and Next marks it noindex
export const PLACEHOLDER_PARAM = "_empty";
const FUTURE_DAYS_ALLOWED = 1; // writing from a time zone ahead of UTC
const TAG_PATTERN = /^[a-z0-9-]+$/;
const FRONTMATTER_PATTERN = /^---\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/;
const DAILY_KEYS: ReadonlySet<string> = new Set(["title", "tags"]);
const RAMBLE_KEYS: ReadonlySet<string> = new Set(["title", "date", "tags"]);

export interface DailyEntryMeta {
  date: IsoDate;
  title: string | null; // replaces the excerpt in lists
  tags: string[];
  excerpt: string;
}

export interface RambleMeta {
  slug: string;
  title: string;
  date: IsoDate;
  tags: string[];
}

export interface BlogIndex {
  startDate: IsoDate;
  buildDay: IsoDate;
  entries: DailyEntryMeta[]; // newest first
  rambles: RambleMeta[]; // newest first
  tags: string[]; // sorted, unique
}

export interface BlogPostFile {
  frontmatter: Record<string, unknown>;
  body: string;
}

export interface LoadOptions {
  postsDir?: string;
  nowUtc?: Date;
}

export type BlogKind = "days" | "rambles";

export function assertCountWithin(what: string, count: number, max: number, name: string): void {
  if (count > max) {
    const fix = `raise ${name} in src/lib/blog.ts`;
    throw new Error(`${what}: ${count} is over the limit of ${max}; ${fix}`);
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function splitFrontmatter(source: string): BlogPostFile {
  const match = FRONTMATTER_PATTERN.exec(source);
  if (match === null) return { frontmatter: {}, body: source };
  const parsed: unknown = parseYaml(match[1] ?? "");
  const body = source.slice(match[0].length);
  if (parsed === null || parsed === undefined) return { frontmatter: {}, body };
  if (!isRecord(parsed)) throw new Error("frontmatter is not a key: value map");
  return { frontmatter: parsed, body };
}

function decodeKeys(frontmatter: Record<string, unknown>, allowed: ReadonlySet<string>): void {
  for (const key of Object.keys(frontmatter)) {
    if (!allowed.has(key)) throw new Error(`unknown frontmatter key "${key}"`);
  }
}

function decodeTitle(value: unknown): string | null {
  if (value === undefined) return null;
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error("title must be a non-empty string");
  }
  return value;
}

function decodeTags(value: unknown): string[] {
  if (value === undefined) return [];
  if (!Array.isArray(value)) throw new Error("tags must be a list");
  const tags: string[] = [];
  for (const tag of value) {
    if (typeof tag !== "string" || !TAG_PATTERN.test(tag) || tag.length > TAG_LENGTH_MAX) {
      const rule = `use a-z, 0-9 and -, up to ${TAG_LENGTH_MAX} characters`;
      throw new Error(`bad tag ${JSON.stringify(tag)}: ${rule}`);
    }
    tags.push(tag);
  }
  return tags;
}

type BlockNode = ReturnType<typeof fromMarkdown>["children"][number];
type InlineNode = Extract<BlockNode, { type: "paragraph" }>["children"][number];
const WORD_CHARACTER = /[\p{L}\p{N}]/u;

// `2*3*4` parses as emphasis; a marker touching a letter or digit is prose, keep it as written
function inlineText(node: InlineNode, markdown: string): string {
  if (node.type === "html") return "";
  if (node.type !== "emphasis" && node.type !== "strong") return mdastToString(node);
  const start = node.position?.start.offset;
  const end = node.position?.end.offset;
  if (start === undefined || end === undefined) return mdastToString(node);
  const before = markdown[start - 1] ?? "";
  const after = markdown[end] ?? "";
  if (WORD_CHARACTER.test(before) || WORD_CHARACTER.test(after)) {
    return markdown.slice(start, end);
  }
  return mdastToString(node);
}

// MDX import/export lines read as prose in plain Markdown, so drop them before parsing
export function excerptOf(body: string): string {
  const markdown = body
    .split("\n")
    .filter((line) => !line.startsWith("import ") && !line.startsWith("export "))
    .join("\n");
  const parts: string[] = [];
  for (const node of fromMarkdown(markdown).children) {
    if (node.type !== "paragraph") continue;
    for (const child of node.children) parts.push(inlineText(child, markdown));
    parts.push(" ");
  }
  const text = parts.join("").replace(/\s+/g, " ").trim();
  const codePoints = Array.from(text);
  if (codePoints.length <= EXCERPT_LENGTH_MAX) return text;
  const cut = codePoints.slice(0, EXCERPT_LENGTH_MAX).join("");
  const lastSpace = cut.lastIndexOf(" ");
  const result = (lastSpace > 0 ? cut.slice(0, lastSpace) : cut) + "…";
  if (Array.from(result).length > EXCERPT_LENGTH_MAX + 1) throw new Error("invariant: excerpt");
  return result;
}

function isMissingFile(error: unknown): boolean {
  return error instanceof Error && "code" in error && error.code === "ENOENT";
}

// git keeps no empty folders, so a missing folder is an empty one
async function listMdxNames(directory: string): Promise<string[]> {
  try {
    const names = await readdir(directory);
    return names.filter((name) => name.endsWith(".mdx")).map((name) => name.slice(0, -4));
  } catch (error) {
    if (isMissingFile(error)) return [];
    throw error;
  }
}

function isValidName(kind: BlogKind, name: string): boolean {
  switch (kind) {
    case "days":
      return isIsoDate(name);
    case "rambles":
      return isValidSlug(name);
  }
}

// null means no such post; any other read failure is real and thrown
export async function readBlogPost(
  kind: BlogKind,
  name: string,
  postsDir: string = POSTS_DIRECTORY,
): Promise<BlogPostFile | null> {
  if (!isValidName(kind, name)) return null;
  // every /blog page is prebuilt (dynamicParams = false), so nothing reads posts/ at request
  // time; without this, the test-only postsDir makes Turbopack trace the whole project
  const kindDir = path.join(/*turbopackIgnore: true*/ postsDir, kind);
  const filePath = path.join(kindDir, `${name}.mdx`);
  if (path.dirname(filePath) !== kindDir) {
    throw new Error(`invariant: blog path escaped posts/${kind}: ${filePath}`);
  }
  let source: string;
  try {
    source = await readFile(filePath, { encoding: "utf8" });
  } catch (error) {
    if (isMissingFile(error)) return null;
    throw error;
  }
  try {
    return splitFrontmatter(source);
  } catch (error) {
    throw new Error(`posts/${kind}/${name}.mdx: ${String(error)}`, { cause: error });
  }
}

async function readOrThrow(kind: BlogKind, name: string, postsDir: string): Promise<BlogPostFile> {
  const file = await readBlogPost(kind, name, postsDir);
  if (file === null) throw new Error(`invariant: posts/${kind}/${name}.mdx vanished`);
  return file;
}

async function loadDailyEntries(postsDir: string): Promise<DailyEntryMeta[]> {
  const names = await listMdxNames(path.join(postsDir, "days"));
  assertCountWithin("daily entries", names.length, DAILY_ENTRY_COUNT_MAX, "DAILY_ENTRY_COUNT_MAX");
  const entries: DailyEntryMeta[] = [];
  for (const name of names) {
    if (!isIsoDate(name)) throw new Error(`posts/days/${name}.mdx: name must be YYYY-MM-DD`);
    const file = await readOrThrow("days", name, postsDir);
    try {
      decodeKeys(file.frontmatter, DAILY_KEYS);
      entries.push({
        date: name,
        title: decodeTitle(file.frontmatter.title),
        tags: decodeTags(file.frontmatter.tags),
        excerpt: excerptOf(file.body),
      });
    } catch (error) {
      throw new Error(`posts/days/${name}.mdx: ${String(error)}`, { cause: error });
    }
  }
  return entries;
}

async function loadRambles(postsDir: string): Promise<RambleMeta[]> {
  const names = await listMdxNames(path.join(postsDir, "rambles"));
  assertCountWithin("Rambles", names.length, RAMBLE_COUNT_MAX, "RAMBLE_COUNT_MAX");
  const rambles: RambleMeta[] = [];
  for (const name of names) {
    if (!isValidSlug(name)) throw new Error(`posts/rambles/${name}.mdx: name is not a valid slug`);
    // slugs allow "_", so this one name would collide with the empty-list placeholder
    if (name === PLACEHOLDER_PARAM) throw new Error(`posts/rambles/${name}.mdx: name is reserved`);
    const file = await readOrThrow("rambles", name, postsDir);
    try {
      decodeKeys(file.frontmatter, RAMBLE_KEYS);
      const title = decodeTitle(file.frontmatter.title);
      if (title === null) throw new Error("a Ramble needs a title");
      const date = file.frontmatter.date;
      if (typeof date !== "string" || !isIsoDate(date)) {
        throw new Error("a Ramble needs date: YYYY-MM-DD");
      }
      rambles.push({ slug: name, title, date, tags: decodeTags(file.frontmatter.tags) });
    } catch (error) {
      throw new Error(`posts/rambles/${name}.mdx: ${String(error)}`, { cause: error });
    }
  }
  return rambles;
}

async function readBlogIndex(postsDir: string, nowUtc: Date): Promise<BlogIndex> {
  const entries = await loadDailyEntries(postsDir);
  const rambles = await loadRambles(postsDir);
  if (entries.length === 0) {
    throw new Error("the blog has no daily entries; write posts/days/YYYY-MM-DD.mdx first");
  }
  const buildDay = utcTodayIso(nowUtc);
  const latestAllowed = addDays(buildDay, FUTURE_DAYS_ALLOWED);
  const dates = [...entries.map((entry) => entry.date), ...rambles.map((ramble) => ramble.date)];
  for (const date of dates) {
    if (date > latestAllowed) throw new Error(`a post is dated ${date}, after ${latestAllowed}`);
  }
  const tags = [...new Set([...entries, ...rambles].flatMap((post) => post.tags))].sort();
  assertCountWithin("tags", tags.length, TAG_COUNT_MAX, "TAG_COUNT_MAX");
  entries.sort((a, b) => b.date.localeCompare(a.date));
  rambles.sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
  const startDate = [...dates].sort()[0];
  if (startDate === undefined) throw new Error("invariant: no dates despite entries");
  return { startDate, buildDay, entries, rambles, tags };
}

// one load per production build worker; a failed load is dropped so it isn't served forever
export function memoizeUntilRejected<T>(load: () => Promise<T>): () => Promise<T> {
  let cached: Promise<T> | null = null;
  return () => {
    if (cached === null) {
      const pending = load();
      cached = pending;
      // the caller still sees the rejection through `pending`; this only clears the cache
      void pending.catch(() => {
        if (cached === pending) cached = null;
      });
    }
    return cached;
  };
}

const loadProductionIndex = memoizeUntilRejected(() =>
  readBlogIndex(POSTS_DIRECTORY, new Date()),
);

export function loadBlogIndex(options?: LoadOptions): Promise<BlogIndex> {
  if (options === undefined && process.env.NODE_ENV === "production") {
    return loadProductionIndex();
  }
  return readBlogIndex(options?.postsDir ?? POSTS_DIRECTORY, options?.nowUtc ?? new Date());
}

export function pageCount(entryCount: number): number {
  if (!Number.isInteger(entryCount) || entryCount < 0) {
    throw new Error(`invariant: bad entry count ${entryCount}`);
  }
  return Math.max(1, Math.ceil(entryCount / ENTRIES_PER_PAGE));
}

export function dayPageDates(startDate: IsoDate, buildDay: IsoDate): IsoDate[] {
  if (!isIsoDate(startDate) || !isIsoDate(buildDay)) throw new Error("invariant: bad dates");
  const lastDate = addDays(buildDay, DAYS_AHEAD);
  const dates: IsoDate[] = [];
  for (let date = startDate; date <= lastDate; date = addDays(date, 1)) {
    dates.push(date);
    assertCountWithin("day pages", dates.length, DAY_PAGE_COUNT_MAX, "DAY_PAGE_COUNT_MAX");
  }
  return dates;
}
