import { HEADING, PANEL, TagPills } from "./blog-bits";
import { formatDate } from "../lib/dates";
import type { DailyEntryMeta } from "../lib/blog";

// a title, when set, replaces the excerpt
export default function BlogFeedItem({ entry }: { entry: DailyEntryMeta }) {
  return (
    <article className={PANEL}>
      <a href={`/blog/${entry.date}`} className={`${HEADING} text-3xl hover:underline`}>
        {formatDate(entry.date, "feed")}
      </a>
      {entry.title !== null ? (
        <p className="text-white text-xl mt-2">{entry.title}</p>
      ) : (
        entry.excerpt !== "" && <p className="text-white/90 mt-2">{entry.excerpt}</p>
      )}
      <TagPills tags={entry.tags} />
    </article>
  );
}
