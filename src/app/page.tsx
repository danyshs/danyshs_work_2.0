// ./src/app/page.tsx

import React from "react";
import dynamic from "next/dynamic";
import Navbar from "./navbar";
import MyBG from "./myBG";
import { my_sections, Card } from "./projectData";
import BlogSection from "../components/blog";

const HeightAdjuster = dynamic(() => import("../components/HeightAdjuster"), {
  ssr: false,
});

export default function Home() {
  const additionalCard: Card = {
    href: "./projects/",
    imgsrc: "bg-more_fried min-h-32 md:min-w-96 justify-center",
    hoverimgsrc:
      "group-hover:scale-125 hover:transform duration-100 bg-center bg-cover",
    main: true,
  };

  const filteredProjects = my_sections.flatMap((section) =>
    section.projects.filter((proj) => proj.main === true)
  );

  return (
    <MyBG>
      <div className="flex flex-col items-center">
        <Navbar />
        <div className="md:border-8 border-double border-black space-y-2 px-4 py-2 max-w-4xl w-full">
          <BlogSection />
          <div className="text-4xl text-center text-cyan-900 font-outlinepx bg-black w-full p-2">
            Some Projects
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-4">
            {projects_list(filteredProjects)}
            <div className="col-span-1 md:col-span-2 w-screen md:w-full">
              {project_card(additionalCard, true)}
            </div>
          </div>
        </div>
      </div>
      <HeightAdjuster />
    </MyBG>
  );
}

const projects_list = (projects: Card[]): React.ReactNode[] => {
  return projects.map((proj: Card, index: number) => project_card(proj));
};

const project_card = (proj: Card, isAdditional = false): React.ReactNode => {
  const additionalStyles = isAdditional
    ? "hover:scale-110"
    : "hover:scale-105 w-96";

  return (
    <a
      key={proj.href}
      href={proj.href}
      className={`block ${additionalStyles} project-card`}
    >
      <div
        className={`group relative transition transform duration-300 ${
          isAdditional ? "hover:rotate-12" : ""
        } ring-2 ring-blue-800/50 hover:ring-4 rounded-lg overflow-hidden flex flex-col h-full`}
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
  );
};
