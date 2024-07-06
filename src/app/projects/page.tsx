// ./src/app/page.tsx
import Navbar from "../navbar";
import MyBG from "../myBG";

interface Card {
  href: string;
  imgsrc: string;
  hoverimgsrc: string;
  alt?: string;
}

interface Section {
  title: string;
  projects: Card[];
}

export default function Home() {
  const DanyshS = () => {
    const text = "Danysh S";
    return (
      <div className="text-nowrap break-inside-avoid-column select-none font-comp_pixel md:text-6xl relative z-10 text-3xl text-cyan-900">
        {text.split("").map((char, index) => (
          <span
            key={index}
            className="hover:text-purple-900 transition duration-400"
          >
            {char}
          </span>
        ))}
      </div>
    );
  };

  const TitleText = () => {
    const text = "Data Scientist\nAspiring Game Developer";

    return (
      <blockquote className="text-lg md:text-3xl text-white/80 select-none animate-bounce font-outlinepx italic sm:text-left text-center text-slate-900 relative z-10 break-inside-avoid-column max-h-2">
        {text.split("").map((char, index) => {
          if (char === "D" || char === "S" || char === "d" || char === "s") {
            return (
              <span
                key={index}
                className="hover:text-cyan-900 transition duration-300"
              >
                {char}
              </span>
            );
          } else if (char === "\n") {
            return <br key={index} />;
          } else {
            return char;
          }
        })}
      </blockquote>
    );
  };

  return (
    <MyBG>
      <div className="grid">
        <Navbar title="All Projects" />
        <div className="grid space-y-4 py-4 items-center justify-center">
          {sections_list(my_sections)}
        </div>
      </div>
    </MyBG>
  );
}

// IMAGES ARE 384x96
// TEXT IS 384x44
function contacts_list(contacts: Card[]): React.ReactNode[] {
  return contacts.map((cont: Card, index: number) => (
    <a key={index} href={cont.href}>
      <div
        className={`rounded-full ring-6 ring-blue-800/50 ${cont.imgsrc} ${cont.hoverimgsrc} md:min-w-16 md:min-h-16 min-h-8 relative z-10 min-w-8 hover:scale-120 hover:ring-6 transition duration-300 hover:bg-no-repeat bg-cover`}
      ></div>
    </a>
  ));
}

function sections_list(sections: Section[]): React.ReactNode[] {
  return sections.map((section, index) => (
    <div key={index} className="">
      <h2 className="text-4xl text-center text-cyan-900 font-outlinepx bg-black mb-4">
        {section.title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects_list(section.projects)}
      </div>
      <div className="w-full h-px bg-cyan-900 my-1"></div>
    </div>
  ));
}
function projects_list(projects: Card[]): React.ReactNode[] {
  return projects.map((proj: Card, index: number) => (
    <a key={index} href={proj.href} className="block w-96">
      {" "}
      <div
        className={`group relative transition transform duration-300 hover:scale-105
        ring-2 ring-blue-800/50 hover:ring-4 rounded-lg overflow-hidden`}
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
}

//########### PROJECT SECTIONS ##################

const my_sections: Section[] = [
  {
    title: "Personal Projects",
    projects: [
      {
        href: "./projects/expense_tracker_util",
        imgsrc: "bg-surprise w-full h-full",
        hoverimgsrc: "group-hover:bg-cyan-900 duration-500 bg-contain",
        alt: "expense_tracker_util",
      },
      {
        href: "./projects/gmail_sorting",
        imgsrc: "bg-surprise",
        hoverimgsrc: "group-hover:bg-cyan-800 duration-500 bg-contain",
        alt: "gmail_sorting",
      },
      {
        href: "./projects/gmail_sorting",
        imgsrc: "bg-surprise",
        hoverimgsrc: "group-hover:bg-cyan-800 duration-500 bg-contain",
        alt: "gmail_sorting",
      },
      {
        href: "./projects/gmail_sorting",
        imgsrc: "bg-surprise",
        hoverimgsrc: "group-hover:bg-cyan-800 duration-500 bg-contain",
        alt: "gmail_sorting",
      },
    ],
  },
  {
    title: "Game Dev",
    projects: [
      {
        href: "./projects/try_web_gl",
        imgsrc: "bg-kh_pic",
        hoverimgsrc: "group-hover:bg-blue-800 duration-500 bg-contain",
        alt: "try_web_gl",
      },
      {
        href: "./projects/danyshs_work",
        imgsrc: "bg-kh_pic",
        hoverimgsrc: "group-hover:bg-cyan-900 duration-500 bg-contain",
        alt: "danyshs_work",
      },
      // Add more projects here...
    ],
  },
  /*
  {
    title: "Articles",
    projects: [
      {
        href: "./projects/expense_tracker_util",
        imgsrc: "bg-surprise w-full h-full",
        hoverimgsrc: "group-hover:bg-cyan-900 duration-500 bg-contain",
        alt: "expense_tracker_util",
      },
      {
        href: "./projects/gmail_sorting",
        imgsrc: "bg-surprise",
        hoverimgsrc: "group-hover:bg-cyan-800 duration-500 bg-contain",
        alt: "gmail_sorting",
      },
      // Add more projects here...
    ],
  },
  */
  {
    title: "Videos",
    projects: [
      {
        href: "./projects/example",
        imgsrc: "bg-my_pic",
        hoverimgsrc: "group-hover:bg-blue-700 duration-500 bg-contain",
        alt: "example",
      },
      {
        href: "./projects/example",
        imgsrc: "bg-my_pic",
        hoverimgsrc: "group-hover:bg-cyan-900 duration-500 bg-contain",
        alt: "also example",
      },
      // Add more projects here...
    ],
  },
];
