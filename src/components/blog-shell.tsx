import type { ReactNode } from "react";
import Link from "next/link";
import MyBG from "../app/my-bg";
import Navbar from "../app/navbar";
import BlogCalendar from "./blog-calendar";
import { HEADING, PANEL } from "./blog-bits";
import type { BlogIndex } from "../lib/blog";
import type { IsoDate } from "../lib/dates";

interface BlogShellProps {
  index: BlogIndex;
  focusDate: IsoDate | null;
  children: ReactNode;
}

// every /blog route: the feed column, and a sidebar (above the feed on phones)
export default function BlogShell({ index, focusDate, children }: BlogShellProps) {
  return (
    <MyBG>
      <div className="flex flex-col items-center">
        <Navbar />
        <div className="w-full max-w-5xl px-4 py-4 flex flex-col md:flex-row-reverse gap-4">
          <aside className="md:w-72 shrink-0 space-y-4">
            <div className={`${PANEL} p-3`}>
              <Link href="/blog" className={`${HEADING} block text-4xl text-center mb-2`}>
                Blog
              </Link>
              <BlogCalendar
                startDate={index.startDate}
                buildDay={index.buildDay}
                rambleDates={index.rambles.map((ramble) => ramble.date)}
                focusDate={focusDate}
              />
            </div>
            {index.tags.length > 0 && (
              <nav className={`${PANEL} p-3 font-comp_pixel text-xl`} aria-label="Tags">
                {index.tags.map((tag) => (
                  <a
                    key={tag}
                    href={`/blog/tag/${tag}`}
                    className="mr-2 text-cyan-900 hover:text-white"
                  >
                    #{tag}
                  </a>
                ))}
              </nav>
            )}
          </aside>
          <main className="flex-1 min-w-0 space-y-4">{children}</main>
        </div>
      </div>
    </MyBG>
  );
}
