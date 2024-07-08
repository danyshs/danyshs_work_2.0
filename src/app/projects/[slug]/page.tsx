// src/app/projects/[slug]/page.tsx
import MyBG from "../../myBG";
import { compileMDX } from "next-mdx-remote/rsc";
import path from "path";
import { readFile, access } from "fs/promises";
import { notFound } from "next/navigation";

const POSTS_FOLDER = path.join(process.cwd(), "posts");

async function readPostFile(slug: string) {
  const filePath = path.resolve(path.join(POSTS_FOLDER, `${slug}.mdx`));
  try {
    await access(filePath);
  } catch (err) {
    console.error(`File not found: ${filePath}`, err);
    return null;
  }
  try {
    const fileContent = await readFile(filePath, { encoding: "utf8" });
    return fileContent;
  } catch (err) {
    console.error(`Error reading file: ${filePath}`, err);
    return null;
  }
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const markdown = await readPostFile(params.slug);
  if (!markdown) {
    notFound();
  }
  try {
    const { content } = await compileMDX({
      source: markdown,
      options: { parseFrontmatter: true },
    });

    return (
      <MyBG>
        <div className="bg-gray-900 min-h-screen text-white">
          <div className="bg-black py-8">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-5xl font-cube">Gmail Sorting</h1>
              <p className="text-xl mt-4">
                A utility to sort, tag, categorize, and generate filters on
                GMail
              </p>
              <a
                href="https://github.com/danyshs/gmail_sorting"
                className="bg-white text-black font-bold py-2 px-4 rounded mt-6 inline-block"
              >
                GitHub →
              </a>
            </div>
          </div>
          <article className="prose prose-lg bg-white text-gray-800 p-8 max-w-3xl mx-auto mt-16">
            {content}
          </article>
        </div>
      </MyBG>
    );
  } catch (err) {
    console.error(`Error compiling MDX for slug: ${params.slug}`, err);
    return notFound();
  }
}
