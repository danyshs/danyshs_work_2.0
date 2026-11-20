import { expect, test } from "bun:test";
import {
  isValidSlug,
  listPostSlugs,
  parseFrontmatter,
  readPostSource,
} from "./posts";

// goal: a URL slug can only name a file directly in posts/; checked on the edges of the
// pattern and length limit, then against the real posts/ directory
test("slug check accepts plain names up to 64 chars and nothing else", () => {
  expect(isValidSlug("gmail_sorting")).toBe(true);
  expect(isValidSlug("a-b_9")).toBe(true);
  expect(isValidSlug("x".repeat(64))).toBe(true);
  expect(isValidSlug("x".repeat(65))).toBe(false);
  expect(isValidSlug("")).toBe(false);
  expect(isValidSlug("../package")).toBe(false);
  expect(isValidSlug("a/b")).toBe(false);
  expect(isValidSlug("Gmail")).toBe(false);
  expect(isValidSlug("a.mdx")).toBe(false);
});

test("reading a post: found, missing, and traversal", async () => {
  expect(await readPostSource("gmail_sorting")).toContain("Gmail Sorting");
  expect(await readPostSource("no_such_post")).toBeNull();
  expect(await readPostSource("../README")).toBeNull();
});

test("listing finds the real posts", async () => {
  const slugs = await listPostSlugs();
  expect(slugs).toContain("gmail_sorting");
  expect(slugs.every(isValidSlug)).toBe(true);
});

// goal: frontmatter is decoded once; wrong types are rejected rather than passed on
test("frontmatter decode", () => {
  expect(parseFrontmatter({ title: "T", description: "D" })).toEqual({
    title: "T",
    description: "D",
  });
  expect(parseFrontmatter({ title: "T", description: "D", repository: "o/r" })).toEqual({
    title: "T",
    description: "D",
    repository: "o/r",
  });
  expect(parseFrontmatter({ description: "D" })).toBeNull();
  expect(parseFrontmatter({ title: "T" })).toBeNull();
  expect(parseFrontmatter({ title: 1, description: "D" })).toBeNull();
  expect(parseFrontmatter({ title: "T", description: "D", repository: 5 })).toBeNull();
  expect(parseFrontmatter(null)).toBeNull();
  expect(parseFrontmatter("title: T")).toBeNull();
});
