import Navbar from "./navbar";
import MyBG from "./my-bg";
import { my_sections, type ProjectCard } from "./project-data";
import BlogSection from "../components/blog";
import HeightAdjusterWrapper from "../components/height-adjuster-wrapper";
import ProjectCardLink from "../components/project-card";

const ALL_PROJECTS_CARD: ProjectCard = {
  href: "./projects/",
  imgsrc: "bg-more_fried min-h-32 md:min-w-96 justify-center",
  hoverimgsrc: "group-hover:scale-125 hover:transform duration-100 bg-center bg-cover",
  main: true,
};

export default function Home() {
  const mainProjects = my_sections.flatMap((section) =>
    section.projects.filter((project) => project.main === true),
  );

  return (
    <MyBG>
      <div className="flex flex-col items-center">
        <Navbar />
        <div
          className={[
            "md:border-8 border-double border-black space-y-2 px-4 py-2 max-w-4xl w-full",
          ].join(" ")}
        >
          <BlogSection />
          <div className="text-4xl text-center text-cyan-900 font-outlinepx bg-black w-full p-2">
            Other Projects
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-4">
            {mainProjects.map((project) => (
              <ProjectCardLink key={project.href} card={project} />
            ))}
            <div className="col-span-1 md:col-span-2 w-screen md:w-full">
              <ProjectCardLink card={ALL_PROJECTS_CARD} isBanner />
            </div>
          </div>
        </div>
      </div>
      <HeightAdjusterWrapper />
    </MyBG>
  );
}
