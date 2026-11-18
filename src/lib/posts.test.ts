import { expect, test } from "bun:test";
import {
  extractFrontmatter,
  isValidSlug,
  listAllPosts,
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

test("extractFrontmatter parses keys and arrays", () => {
  const source = `---
title: "My Post"
description: "A cool description"
date: "2026-11-17"
tags: ["systems", "vulkan", "wine"]
type: "blog"
---

Body content here
`;
  const raw = extractFrontmatter(source);
  expect(raw).not.toBeNull();
  expect(raw?.title).toBe("My Post");
  expect(raw?.description).toBe("A cool description");
  expect(raw?.date).toBe("2026-11-17");
  expect(raw?.tags).toEqual(["systems", "vulkan", "wine"]);
  expect(raw?.type).toBe("blog");
});

test("listAllPosts returns sorted metadata", async () => {
  const posts = await listAllPosts();
  expect(posts.length).toBeGreaterThan(0);
  // newest first
  const dates = posts.map((p) => p.date);
  expect(dates).toEqual([...dates].sort().reverse());
  const blogs = await listAllPosts("blog");
  expect(blogs.length).toBeGreaterThan(0);
  expect(blogs.every((p) => p.type === "blog")).toBe(true);
  expect(blogs.length).toBeLessThan(posts.length);
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
