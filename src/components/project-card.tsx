import type { ProjectCard } from "../app/project-data";

interface ProjectCardLinkProps {
  card: ProjectCard;
  // the home page's "all projects" banner: tilts on hover and spans the row
  isBanner?: boolean;
}

export default function ProjectCardLink({ card, isBanner = false }: ProjectCardLinkProps) {
  const sizeClass = isBanner ? "hover:scale-110" : "hover:scale-105 w-96";
  const tiltClass = isBanner ? "hover:rotate-12" : "";
  return (
    <a href={card.href} className={`block ${sizeClass} project-card`}>
      <div
        className={[
          "group relative transition transform duration-300",
          tiltClass,
          "ring-2 ring-blue-800/50 hover:ring-4 rounded-lg overflow-hidden flex flex-col h-full",
        ].join(" ")}
      >
        <div
          className={[
            "bg-no-repeat block bg-center min-h-24 w-full",
            card.imgsrc,
            card.hoverimgsrc,
          ].join(" ")}
        />
        {card.alt !== undefined && (
          <div
            className={[
              "flex-grow flex flex-col justify-between w-full text-center text-xl",
              "text-black font-outlinepx_solid p-1 bg-white/40",
            ].join(" ")}
          >
            <div>
              {card.alt}
              <div className="w-full h-1 bg-black/50" />
              <div className="text-black break-before-all font-mono">{card.altdesc}</div>
            </div>
          </div>
        )}
      </div>
    </a>
  );
}
