// ./src/app/page.tsx

import React from "react";
import Navbar from "./navbar";
import MyBG from "./myBG";
import { my_sections, Card } from "./projectData";

export default function Home() {
  const additionalCard: Card = {
    href: "./projects/",
    imgsrc: "bg-more_fried min-h-32 min-w-96 justify-center",
    hoverimgsrc:
      "group-hover:scale-125 hover:transform duration-100 bg-center bg-cover",
    main: true,
  };

  const filteredProjects = my_sections.flatMap((section) =>
    section.projects.filter((proj) => proj.main === true)
  );

  return (
    <MyBG>
      <div className="flex flex-wrap justify-center flex-col flex-grow-0 items-center">
        <Navbar />
        <div className="md:border-8 border-double border-black space-y-4 p-4 border max-w-4xl w-full">
          <div className="text-4xl text-center text-cyan-900 font-outlinepx bg-black w-full p-2">
            Hi! I'm Danysh
          </div>
          <div className="w-full flex justify-center">
            <div className="bg-gradient-to-b from-black/25 to-black/75 w-full max-w-4xl px-6 md:px-16 break-words">
              <div className="text-3xl md:text-4xl text-white font-comp_pixel">
                <div className="text-white font-comp_pixel">
                  I make things that I feel can help everyone make their lives a
                  little bit easier.
                  <br /> Whether it's:
                </div>
                <div className="pl-3">
                  * a
                  <a href="https://www.github.com/danyshs/gmail_sorting">
                    <span className="text-green-900"> utility </span>
                  </a>
                  to automatically categorize and sort their email
                  <br />* a
                  <a href="https://www.github.com/danyshs//powerShell_Utilities">
                    <span className="text-green-900">
                      {" "}
                      bunch of powershell scripts{" "}
                    </span>
                  </a>
                  like a tree printer, screen rotator, or more convenient ways
                  to reduce friction in one's workflow
                  <br />* a
                  <a href="https://www.github.com/danyshs//PSWeave_Gemini">
                    <span className="text-green-900">
                      {" "}
                      version of Fabric AI that uses Gemini instead
                    </span>
                  </a>
                  , so that those without the paid subscription of ChatGPT are
                  able to scan YouTube videos, transcribe audio files, etc.
                  <br />
                  <a href="https://www.github.com/danyshs/PSWeave_Gemini">
                    <span className="text-green-900">
                      [Currently in Progress]
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="text-4xl text-center text-cyan-900 font-outlinepx bg-black w-full p-2">
            Projects
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-4">
            {projects_list(filteredProjects)}
            <div className="col-span-1 md:col-span-2 w-full">
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
  const additionalStyles = isAdditional
    ? "hover:scale-110"
    : "hover:scale-105 w-96";

  return (
    <a key={proj.href} href={proj.href} className={`block ${additionalStyles}`}>
      <div
        className={`group relative transition transform duration-300 ${
          isAdditional ? "hover:rotate-12" : ""
        } ring-2 ring-blue-800/50 hover:ring-4 rounded-lg overflow-hidden`}
      >
        <div
          className={`bg-no-repeat block bg-center min-h-24 w-full ${proj.imgsrc} ${proj.hoverimgsrc}`}
        ></div>
        {proj.alt && (
          <div className="w-full text-center text-xl text-black font-outlinepx_solid p-1 bg-white/40 break-words">
            {proj.alt}
          </div>
        )}
      </div>
    </a>
  );
};
