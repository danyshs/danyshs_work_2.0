import BlogShell from "./blog-shell";
import BlogFeedItem from "./blog-feed-item";
import { RambleGrid } from "./ramble-card";
import { HEADING } from "./blog-bits";
import { ENTRIES_PER_PAGE, pageCount, type BlogIndex } from "../lib/blog";

function pageHref(page: number): string {
  return page === 1 ? "/blog" : `/blog/page/${page}`;
}

function Pagination({ page, total }: { page: number; total: number }) {
  if (total <= 1) return null;
  const pages = Array.from({ length: total }, (_, index) => index + 1);
  const arrow = "px-2 text-cyan-900 hover:text-white";
  return (
    <nav className="font-comp_pixel text-3xl text-center space-x-2" aria-label="Pages">
      {page > 1 && (
        <a href={pageHref(page - 1)} className={arrow} aria-label="Newer">◄</a>
      )}
      {pages.map((number) =>
        number === page ? (
          <span key={number} className="text-white">{number}</span>
        ) : (
          <a key={number} href={pageHref(number)} className="text-cyan-900 hover:text-white">
            {number}
          </a>
        ),
      )}
      {page < total && (
        <a href={pageHref(page + 1)} className={arrow} aria-label="Older">►</a>
      )}
    </nav>
  );
}

// the feed for /blog (page 1) and /blog/page/<n>
export default function BlogFeedPage({ index, page }: { index: BlogIndex; page: number }) {
  const total = pageCount(index.entries.length);
  if (!Number.isInteger(page) || page < 1 || page > total) {
    throw new Error(`invariant: page ${page} outside 1..${total}`);
  }
  const first = (page - 1) * ENTRIES_PER_PAGE;
  const entries = index.entries.slice(first, first + ENTRIES_PER_PAGE);
  return (
    <BlogShell index={index} focusDate={null}>
      {index.rambles.length > 0 && (
        <section className="space-y-3">
          <h2 className={`${HEADING} text-4xl bg-black p-2 text-center`}>Rambles</h2>
          <RambleGrid rambles={index.rambles} />
        </section>
      )}
      {entries.map((entry) => (
        <BlogFeedItem key={entry.date} entry={entry} />
      ))}
      <Pagination page={page} total={total} />
    </BlogShell>
  );
}
