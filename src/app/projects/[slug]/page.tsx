// src/app/projects/[slug]/page.tsx
import MyBG from "../../my-bg";
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
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;  // Next 15+ passes params as a Promise; sync access is gone in 16
  const markdown = await readPostFile(slug);
  if (!markdown) {
    notFound();
  }
  try {
    const { content, frontmatter } = await compileMDX<{
      title: string;
      description: string;
      repository: string;
    }>({
      source: markdown,
      options: { parseFrontmatter: true },
    });

    return (
      <MyBG>
        <div className="bg-gray-900 min-h-screen text-white">
          <div className="bg-black py-8">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-5xl font-cube">{frontmatter.title}</h1>
              <p className="text-xl mt-4">{frontmatter.description}</p>
              {frontmatter.repository && (
                <div className="flex justify-center items-center mt-6">
                  <a
                    href="./"
                    className="text-3xl md:text-6xl font-pixarrows text-cyan-900 cursor-pointer mr"
                  >
                    a
                  </a>
                  <a
                    href={`https://www.github.com/${frontmatter.repository}`}
                    className="bg-white text-black font-bold py-2 px-4 rounded inline-block"
                  >
                    GitHub →
                  </a>
                </div>
              )}
            </div>
          </div>
          <article className="prose prose-lg bg-white text-gray-800 p-8 max-w-3xl mx-auto mt-16">
            {content}
            {frontmatter.repository && (
              <div className="mt-8 text-center">
                <a
                  href={`https://www.github.com/${frontmatter.repository}`}
                  className="bg-gray-900 text-white font-bold py-2 px-4 rounded inline-block"
                >
                  GitHub →
                </a>
              </div>
            )}
          </article>
        </div>
      </MyBG>
    );
  } catch (err) {
    console.error(`Error compiling MDX for slug: ${slug}`, err);
    return notFound();
  }
}
