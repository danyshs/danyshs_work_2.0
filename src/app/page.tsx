//./src/app/page.tsx
import React from "react";
import Navbar from "./navbar";
import MyBG from "./myBG";

interface Card {
  href: string;
  imgsrc: string;
  hoverimgsrc: string;
  alt?: string;
}

const my_projects: Card[] = [
  {
    href: "./projects/danyshs_work",
    imgsrc: "bg-kh_pic",
    hoverimgsrc: "group-hover:bg-blue-800  duration-500  bg-contain",
    alt: "DDDDDDDDDDDD",
  },
  {
    href: "./projects/gmail_sorting",
    imgsrc: "bg-kh_pic",
    hoverimgsrc: "group-hover:bg-blue-700 duration-500  bg-contain",
    alt: "Gmail Sorting",
  },
  {
    href: "./projects/pwsh_utilities",
    imgsrc: "bg-surprise",
    hoverimgsrc: "group-hover:bg-cyan-900 duration-500  bg-contain",
    alt: "Powershell Utilities",
  },
  {
    href: "./projects/psweave_gemini",
    imgsrc: "bg-surprise",
    hoverimgsrc: "group-hover:bg-cyan-800 duration-500  bg-contain",
    alt: "PSWeave Gemini",
  },
  {
    href: "./projects/",
    imgsrc: "bg-more_fried",
    hoverimgsrc:
      "group-hover:scale-110 bg-clip object-fill hover:transform duration-100 bg-cover",
  },
];

interface Card {
  href: string;
  imgsrc: string;
  hoverimgsrc: string;
  alt?: string;
}

export default function Home() {
  return (
    <MyBG>
      <div className="grid">
        <div>
          <Navbar title="Projects" />
          <div className="grid space-y-4 py-4 items-center justify-center">
            {projects_list(my_projects)}
          </div>
        </div>
      </div>
    </MyBG>
  );
}

const projects_list = (projects: Card[]): React.ReactNode[] => {
  return projects.map((proj: Card, index: number) => (
    <a key={index} href={proj.href} className="block w-96">
      <div
        className={`group relative transition transform duration-300 ${
          index === projects.length - 1
            ? "hover:scale-125 hover:rotate-12"
            : "hover:scale-105"
        } ring-2 ring-blue-800/50 hover:ring-4 rounded-lg overflow-hidden`}
      >
        <div
          className={`bg-no-repeat block bg-center min-h-24 w-full ${proj.imgsrc} ${proj.hoverimgsrc}`}
        ></div>
        {proj.alt && (
          <div className="w-full text-center text-xl text-cyan-900 font-outlinepx_solid p-1 bg-purple-400 break-words">
            {proj.alt}
          </div>
        )}
      </div>
    </a>
  ));
};
