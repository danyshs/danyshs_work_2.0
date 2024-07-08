// ./src/app/page.tsx

import React from "react";
import Navbar from "./navbar";
import MyBG from "./myBG";
import { my_sections, Card } from "./projectData";

export default function Home() {
  const additionalCard: Card = {
    href: "./projects/",
    imgsrc: "bg-more_fried",
    hoverimgsrc:
      "group-hover:scale-110 bg-clip object-fill hover:transform duration-100 bg-cover",
    main: true,
  };

  const filteredProjects = my_sections.flatMap((section) =>
    section.projects.filter((proj) => proj.main === true)
  );

  return (
    <MyBG>
      <div className="flex flex-col items-center">
        <Navbar />
        <div className="space-y-4 py-4">
          <div className="text-4xl col-span-2 text-center text-cyan-900 font-outlinepx bg-black w-full p-2">
            Projects
          </div>
          <div className="">
            {projects_list(filteredProjects)}
            <div className="col-span-2">
              {project_card(additionalCard, true)}
            </div>
          </div>
        </div>
      </div>
    </MyBG>
  );
}

const projects_list = (projects: Card[]): React.ReactNode[] => {
  return projects.map((proj: Card, index: number) => project_card(proj));
};

const project_card = (proj: Card, isAdditional = false): React.ReactNode => {
  const additionalStyles = isAdditional ? "hover:scale-110" : "hover:scale-105";

  return (
    <a
      key={proj.href}
      href={proj.href}
      className={`block w-96 ${additionalStyles}`}
    >
      <div
        className={`group relative transition transform duration-300 ${
          isAdditional ? "hover:rotate-12" : ""
        } ring-2 ring-blue-800/50 hover:ring-4 rounded-lg overflow-hidden`}
      >
        <div
          className={`bg-no-repeat block bg-center min-h-24 w-full ${proj.imgsrc} ${proj.hoverimgsrc}`}
        ></div>
        {proj.alt && (
          <div className="w-full text-center text-xl text-cyan-900 font-outlinepx_solid bg-purple-400 break-words">
            {proj.alt}
          </div>
        )}
      </div>
    </a>
  );
};
