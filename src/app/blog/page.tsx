import type { Metadata } from "next";
import BlogFeedPage from "../../components/blog-feed-page";
import { loadBlogIndex } from "../../lib/blog";

export const metadata: Metadata = { title: "Blog · Danysh" };

export default async function BlogPage() {
  const index = await loadBlogIndex();
  return <BlogFeedPage index={index} page={1} />;
}
