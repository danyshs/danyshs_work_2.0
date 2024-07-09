import Navbar from "../navbar";
import MyBG from "../myBG";
import { my_sections, Card, Section } from "../projectData";
import dynamic from "next/dynamic";

// Dynamically import HeightAdjuster only on the client side
const HeightAdjuster = dynamic(
  () => import("../../components/HeightAdjuster"),
  {
    ssr: false,
  }
);

export default function AllProjects() {
  return (
    <MyBG>
      <div className="flex flex-col items-center">
        <Navbar />
        <div className="grid space-y-4 py-4 items-center justify-center">
          {sections_list(my_sections)}
        </div>
      </div>
      <HeightAdjuster />
    </MyBG>
  );
}

function sections_list(sections: Section[]): React.ReactNode[] {
  return sections.map((section, index) => (
    <div key={index} className="">
      <h2 className="text-3xl md:text-4xl text-center text-cyan-900 font-outlinepx bg-black mb-4">
        {section.title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects_list(section.projects)}
      </div>
    </div>
  ));
}

function projects_list(projects: Card[]): React.ReactNode[] {
  return projects.map((proj: Card, index: number) => (
    <a
      key={index}
      href={proj.href}
      className={`block hover:scale-105 w-96 project-card`}
    >
      <div
        className={`group relative transition transform duration-300 ring-2 ring-blue-800/50 hover:ring-4 rounded-lg overflow-hidden flex flex-col h-full`}
      >
        <div
          className={`bg-no-repeat block bg-center min-h-24 w-full ${proj.imgsrc} ${proj.hoverimgsrc}`}
        ></div>
        {proj.alt && (
          <div className="flex-grow flex flex-col justify-between w-full text-center text-xl text-black font-outlinepx_solid p-1 bg-white/40">
            <span>
              {proj.alt}
              <div className="w-full h-1 bg-black/50"></div>
              <div className="text-black break-before-all font-mono">
                {proj.altdesc}
              </div>
            </span>
          </div>
        )}
      </div>
    </a>
  ));
}
