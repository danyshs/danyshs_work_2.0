import type { ReactElement } from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import MyBG from "../../my-bg";
import {
  listPostSlugs,
  parseFrontmatter,
  readPostSource,
  type PostFrontmatter,
} from "../../../lib/posts";

// every post is rendered at build time, so a broken post fails the build, not a visitor
export const dynamicParams = false;

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs = await listPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

interface CompiledPost {
  content: ReactElement;
  frontmatter: PostFrontmatter;
}

async function compilePost(slug: string): Promise<CompiledPost | null> {
  const source = await readPostSource(slug);
  if (source === null) return null;
  const compiled = await compileMDX({ source, options: { parseFrontmatter: true } });
  const frontmatter = parseFrontmatter(compiled.frontmatter);
  if (frontmatter === null) {
    throw new Error(`posts/${slug}.mdx: frontmatter needs a string title and description`);
  }
  return { content: compiled.content, frontmatter };
}

function GitHubButton({ repository, className }: { repository: string; className: string }) {
  return (
    <a
      href={`https://www.github.com/${repository}`}
      className={`font-bold py-2 px-4 rounded inline-block ${className}`}
    >
      GitHub →
    </a>
  );
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // a Promise since Next 15
  const post = await compilePost(slug);
  if (post === null) notFound();
  const { content, frontmatter } = post;

  return (
    <MyBG>
      <div className="bg-gray-900 min-h-screen text-white">
        <div className="bg-black py-8">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-cube">{frontmatter.title}</h1>
            <p className="text-xl mt-4">{frontmatter.description}</p>
            {frontmatter.repository !== undefined && (
              <div className="flex justify-center items-center mt-6">
                <a
                  href="./"
                  className="text-3xl md:text-6xl font-pixarrows text-cyan-900 cursor-pointer"
                >
                  a
                </a>
                <GitHubButton
                  repository={frontmatter.repository}
                  className="bg-white text-black"
                />
              </div>
            )}
          </div>
        </div>
        <article className="prose prose-lg bg-white text-gray-800 p-8 max-w-3xl mx-auto mt-16">
          {content}
          {frontmatter.repository !== undefined && (
            <div className="mt-8 text-center">
              <GitHubButton
                repository={frontmatter.repository}
                className="bg-gray-900 text-white"
              />
            </div>
          )}
        </article>
      </div>
    </MyBG>
  );
}
