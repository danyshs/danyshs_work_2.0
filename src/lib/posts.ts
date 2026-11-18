import path from "node:path";
import { readdir, readFile } from "node:fs/promises";

const POSTS_DIRECTORY = path.join(process.cwd(), "posts");
const POST_COUNT_MAX = 100;
const SLUG_LENGTH_MAX = 64;
const SLUG_PATTERN = /^[a-z0-9_-]+$/;

export interface PostFrontmatter {
  title: string;
  description: string;
  date?: string;
  repository?: string;
  tags?: string[];
  type?: "blog" | "project";
}

export interface PostMetadata {
  slug: string;
  title: string;
  description: string;
  date: string;
  repository?: string;
  tags: string[];
  type: "blog" | "project";
}

// slugs come from the URL: plain names only, so "../" can never leave posts/
export function isValidSlug(slug: string): boolean {
  if (slug.length > SLUG_LENGTH_MAX) return false; // the pattern already rejects ""
  return SLUG_PATTERN.test(slug);
}

function postPath(slug: string): string {
  if (!isValidSlug(slug)) throw new Error(`invariant: unchecked slug "${slug}"`);
  const filePath = path.join(POSTS_DIRECTORY, `${slug}.mdx`);
  if (path.dirname(filePath) !== POSTS_DIRECTORY) {
    throw new Error(`invariant: post path escaped posts/: ${filePath}`);
  }
  return filePath;
}

function isMissingFile(error: unknown): boolean {
  return error instanceof Error && "code" in error && error.code === "ENOENT";
}

// null means "no such post" (a 404); any other read failure is real and thrown
export async function readPostSource(slug: string): Promise<string | null> {
  if (!isValidSlug(slug)) return null;
  try {
    return await readFile(postPath(slug), { encoding: "utf8" });
  } catch (error) {
    if (isMissingFile(error)) return null;
    throw error;
  }
}

export async function listPostSlugs(): Promise<string[]> {
  const names = await readdir(POSTS_DIRECTORY);
  const slugs = names
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => name.slice(0, -".mdx".length));
  for (const slug of slugs) {
    if (!isValidSlug(slug)) throw new Error(`posts/${slug}.mdx: name is not a valid slug`);
  }
  if (slugs.length > POST_COUNT_MAX) {
    throw new Error(`${slugs.length} posts, over the ${POST_COUNT_MAX} limit`);
  }
  return slugs;
}

// the one place raw YAML frontmatter becomes a typed value
export function parseFrontmatter(value: unknown): PostFrontmatter | null {
  if (typeof value !== "object" || value === null) return null;
  if (!("title" in value) || typeof value.title !== "string") return null;
  if (!("description" in value) || typeof value.description !== "string") return null;

  const result: PostFrontmatter = {
    title: value.title,
    description: value.description,
  };

  if ("repository" in value) {
    if (typeof value.repository !== "string") return null;
    result.repository = value.repository;
  }

  if ("date" in value) {
    if (typeof value.date === "string") {
      result.date = value.date;
    }
  }

  if ("type" in value) {
    if (value.type === "blog" || value.type === "project") {
      result.type = value.type;
    }
  }

  if ("tags" in value && Array.isArray(value.tags)) {
    result.tags = value.tags.filter((t): t is string => typeof t === "string");
  }

  return result;
}

export function extractFrontmatter(source: string): Record<string, unknown> | null {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match || !match[1]) return null;
  const result: Record<string, unknown> = {};
  for (const rawLine of match[1].split("\n")) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;
    const key = line.slice(0, colonIndex).trim();
    let val = line.slice(colonIndex + 1).trim();
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
    if (val.startsWith("[") && val.endsWith("]")) {
      result[key] = val
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
    } else {
      result[key] = val;
    }
  }
  return result;
}

export async function getPostMetadata(slug: string): Promise<PostMetadata | null> {
  const source = await readPostSource(slug);
  if (source === null) return null;
  const raw = extractFrontmatter(source);
  if (raw === null) return null;
  const parsed = parseFrontmatter(raw);
  if (parsed === null) return null;
  return {
    slug,
    title: parsed.title,
    description: parsed.description,
    date: parsed.date ?? "2024-01-01",
    repository: parsed.repository,
    tags: parsed.tags ?? [],
    type: parsed.type ?? (parsed.repository ? "project" : "blog"),
  };
}

export async function listAllPosts(filterType?: "blog" | "project"): Promise<PostMetadata[]> {
  const slugs = await listPostSlugs();
  const posts: PostMetadata[] = [];
  for (const slug of slugs) {
    const meta = await getPostMetadata(slug);
    if (meta !== null) {
      if (!filterType || meta.type === filterType) {
        posts.push(meta);
      }
    }
  }
  // Sort newest first
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}
