import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import BlogShell from "../../../../components/blog-shell";
import { HEADING, PANEL, TagPills } from "../../../../components/blog-bits";
import { loadBlogIndex, readBlogPost } from "../../../../lib/blog";
import { formatDate } from "../../../../lib/dates";

export const dynamicParams = false;

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const index = await loadBlogIndex();
  return index.rambles.map((ramble) => ({ slug: ramble.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const index = await loadBlogIndex();
  const ramble = index.rambles.find((candidate) => candidate.slug === slug);
  return ramble === undefined ? {} : { title: `${ramble.title} · Blog` };
}

export default async function RamblePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = await loadBlogIndex();
  const ramble = index.rambles.find((candidate) => candidate.slug === slug);
  if (ramble === undefined) notFound();
  const file = await readBlogPost("rambles", slug);
  if (file === null) throw new Error(`invariant: posts/rambles/${slug}.mdx is in the index only`);
  // the index parsed frontmatter already; the body is compiled as plain MDX
  const { content } = await compileMDX({ source: file.body });

  return (
    <BlogShell index={index} focusDate={ramble.date}>
      <article className={PANEL}>
        <h1 className="text-white text-4xl font-bold ramble-glow">{ramble.title}</h1>
        <a
          href={`/blog/${ramble.date}`}
          className={`${HEADING} block text-2xl mt-2 hover:underline`}
        >
          {formatDate(ramble.date, "day")}
        </a>
        <TagPills tags={ramble.tags} />
        <div className="prose prose-invert prose-lg max-w-none mt-4">{content}</div>
      </article>
    </BlogShell>
  );
}
