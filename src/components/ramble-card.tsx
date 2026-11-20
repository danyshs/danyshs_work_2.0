import { PANEL } from "./blog-bits";
import { formatDate } from "../lib/dates";
import type { RambleMeta } from "../lib/blog";

export default function RambleCard({ ramble }: { ramble: RambleMeta }) {
  return (
    <a
      href={`/blog/rambles/${ramble.slug}`}
      className={`${PANEL} block p-4 hover:border-white`}
    >
      <span className="block text-white font-bold ramble-glow">{ramble.title}</span>
      <span className="block font-comp_pixel text-xl text-cyan-900">
        {formatDate(ramble.date, "feed")}
      </span>
    </a>
  );
}

export function RambleGrid({ rambles }: { rambles: RambleMeta[] }) {
  if (rambles.length === 0) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {rambles.map((ramble) => (
        <RambleCard key={ramble.slug} ramble={ramble} />
      ))}
    </div>
  );
}
