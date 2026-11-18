import Navbar from "../navbar";
import MyBG from "../my-bg";
import { my_sections } from "../project-data";
import HeightAdjusterWrapper from "../../components/height-adjuster-wrapper";
import ProjectCardLink from "../../components/project-card";

export default function AllProjects() {
  return (
    <MyBG>
      <div className="flex flex-col items-center">
        <Navbar />
        <div className="grid space-y-4 py-4 items-center justify-center">
          {my_sections.map((section) => (
            <div key={section.title}>
              <h2
                className={[
                  "text-3xl md:text-4xl text-center text-cyan-900 font-outlinepx bg-black mb-4",
                ].join(" ")}
              >
                {section.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.projects.map((project) => (
                  <ProjectCardLink key={project.href} card={project} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <HeightAdjusterWrapper />
    </MyBG>
  );
}
