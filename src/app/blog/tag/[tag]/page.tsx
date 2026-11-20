import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogShell from "../../../../components/blog-shell";
import { HEADING } from "../../../../components/blog-bits";
import BlogFeedItem from "../../../../components/blog-feed-item";
import { RambleGrid } from "../../../../components/ramble-card";
import { loadBlogIndex, PLACEHOLDER_PARAM } from "../../../../lib/blog";

export const dynamicParams = false;

export async function generateStaticParams(): Promise<{ tag: string }[]> {
  const index = await loadBlogIndex();
  const params = index.tags.map((tag) => ({ tag }));
  return params.length > 0 ? params : [{ tag: PLACEHOLDER_PARAM }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  return { title: `#${tag} · Blog` };
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const index = await loadBlogIndex();
  if (!index.tags.includes(tag)) notFound();
  const rambles = index.rambles.filter((ramble) => ramble.tags.includes(tag));
  const entries = index.entries.filter((entry) => entry.tags.includes(tag));
  return (
    <BlogShell index={index} focusDate={null}>
      <h1 className={`${HEADING} text-4xl bg-black p-2 text-center`}>#{tag}</h1>
      <RambleGrid rambles={rambles} />
      {entries.map((entry) => (
        <BlogFeedItem key={entry.date} entry={entry} />
      ))}
    </BlogShell>
  );
}
