// Styles and tag pills shared by every /blog route.
export const PANEL = "bg-black/75 border-4 border-double border-cyan-600 p-6";
export const HEADING = "font-outlinepx text-cyan-900";

export function TagPills({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {tags.map((tag) => (
        <a
          key={tag}
          href={`/blog/tag/${tag}`}
          className={[
            "font-comp_pixel text-xl text-cyan-900 border border-cyan-600",
            "rounded-full px-2 hover:text-white",
          ].join(" ")}
        >
          #{tag}
        </a>
      ))}
    </div>
  );
}
