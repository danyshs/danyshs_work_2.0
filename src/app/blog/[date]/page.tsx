import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import BlogShell from "../../../components/blog-shell";
import { HEADING, PANEL, TagPills } from "../../../components/blog-bits";
import { dayPageDates, loadBlogIndex, readBlogPost } from "../../../lib/blog";
import { addDays, formatDate, isIsoDate } from "../../../lib/dates";

// every date from the first post to a year past the build; nothing renders at request time
export const dynamicParams = false;

export async function generateStaticParams(): Promise<{ date: string }[]> {
  const index = await loadBlogIndex();
  return dayPageDates(index.startDate, index.buildDay).map((date) => ({ date }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ date: string }>;
}): Promise<Metadata> {
  const { date } = await params;
  if (!isIsoDate(date)) return {};
  return { title: `${formatDate(date, "feed").split(" · ")[1] ?? date} · Blog` };
}

export default async function DayPage({ params }: { params: Promise<{ date: string }> }) {
  const { date } = await params;
  if (!isIsoDate(date)) notFound();
  const index = await loadBlogIndex();
  const builtDates = dayPageDates(index.startDate, index.buildDay);
  const lastDate = builtDates[builtDates.length - 1];
  if (lastDate === undefined || date < index.startDate || date > lastDate) notFound();

  const entry = index.entries.find((candidate) => candidate.date === date) ?? null;
  const rambles = index.rambles.filter((ramble) => ramble.date === date);
  const file = entry === null ? null : await readBlogPost("days", date);
  // the page parsed frontmatter already; the body is compiled as plain MDX
  const body = file === null ? null : (await compileMDX({ source: file.body })).content;

  return (
    <BlogShell index={index} focusDate={date}>
      <article className={PANEL}>
        <h1 className={`${HEADING} text-4xl`}>{formatDate(date, "day")}</h1>
        {entry?.title != null && <p className="text-white text-2xl mt-2">{entry.title}</p>}
        {rambles.map((ramble) => (
          <p key={ramble.slug} className="text-white mt-4">
            <em>I rambled today, check it here!</em>{" "}
            <a href={`/blog/rambles/${ramble.slug}`} className="ramble-glow font-bold underline">
              {ramble.title}
            </a>
          </p>
        ))}
        {body !== null && (
          <div className="prose prose-invert prose-lg max-w-none mt-4">{body}</div>
        )}
        <TagPills tags={entry?.tags ?? []} />
        <nav className="flex justify-between font-comp_pixel text-2xl mt-6 text-cyan-900">
          {date > index.startDate ? (
            <a href={`/blog/${addDays(date, -1)}`} className="hover:text-white">
              ◄ previous day
            </a>
          ) : (
            <span />
          )}
          <Link href="/blog" className="hover:text-white">blog</Link>
          {date < lastDate ? (
            <a href={`/blog/${addDays(date, 1)}`} className="hover:text-white">
              next day ►
            </a>
          ) : (
            <span />
          )}
        </nav>
      </article>
    </BlogShell>
  );
}
