import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogFeedPage from "../../../../components/blog-feed-page";
import { loadBlogIndex, pageCount, PLACEHOLDER_PARAM } from "../../../../lib/blog";

// page 1 is /blog; only 2..pageCount are built, anything else is a 404
export const dynamicParams = false;

export async function generateStaticParams(): Promise<{ n: string }[]> {
  const index = await loadBlogIndex();
  const total = pageCount(index.entries.length);
  const params = Array.from({ length: total - 1 }, (_, offset) => ({ n: String(offset + 2) }));
  return params.length > 0 ? params : [{ n: PLACEHOLDER_PARAM }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ n: string }>;
}): Promise<Metadata> {
  const { n } = await params;
  return { title: `Page ${n} · Blog` };
}

export default async function BlogPageN({ params }: { params: Promise<{ n: string }> }) {
  const { n } = await params;
  const index = await loadBlogIndex();
  const page = Number(n);
  if (!Number.isInteger(page) || page < 2 || page > pageCount(index.entries.length)) notFound();
  return <BlogFeedPage index={index} page={page} />;
}
