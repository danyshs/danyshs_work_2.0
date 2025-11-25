// ./src/app/projectData.ts

export interface Card {
  href: string;
  imgsrc: string;
  hoverimgsrc: string;
  alt?: string;
  altdesc?: string;
  main?: boolean;
}

export interface Section {
  title: string;
  projects: Card[];
}

export const my_sections: Section[] = [
  {
    title: "Personal Projects",
    projects: [
      {
        href: "./projects/expense_tracker_util",
        imgsrc: "bg-expense_tracker bg-black",
        hoverimgsrc: "group-hover:bg-black/50 duration-500 bg-contain",
        alt: "expense_tracker_util",
        altdesc:
          "Reads the expenses and presents it in a nice way that is very nice to look at and lorem placeholder placeholder text",
        main: false,
      },
      {
        href: "./projects/gmail_sorting",
        imgsrc: "bg-gmail_sorting bg-black",
        hoverimgsrc: "group-hover:bg-black/50 duration-500 bg-contain",
        alt: "gmail_sorting",
        altdesc:
          "Scans through every unique email address, allows you to tag them and categorize them into folders",
        main: false,
      },
    ],
  },
  {
    title: "Generative AI",
    projects: [
      {
        // href: "./projects/try_web_gl",
        href: "https://gist.github.com/danyshs/5477a1468e8810b6e703ee03f20400f2",
        imgsrc: "bg-kh_pic",
        hoverimgsrc: "group-hover:bg-blue-800 duration-500 bg-contain",
        alt: "ZettelMancer",
        altdesc: "A second brain that you can work on alongside others, share with others, or compare with others.",
        main: false,
      },
      {
        href: "https://gist.github.com/danyshs/c60a04e034cd8a4fecc406d3bfb77c9a",
        imgsrc: "bg-discwhisp",
        hoverimgsrc: "group-hover:bg-cyan-900 duration-500 bg-contain",
        alt: "DiscWhisper",
        altdesc: "A Closed Captioning system that generates color-coded text to differentiate between multiple voices in a chaotic environment",
        main: false,
      },
      {
        href: "https://gist.github.com/danyshs/c60a04e034cd8a4fecc406d3bfb77c9a",
        imgsrc: "bg-kh_pic",
        hoverimgsrc: "group-hover:bg-cyan-900 duration-500 bg-contain",
        alt: "CareGiver",
        altdesc: "DeveloperWeek 2025 Winner for Oracle and PliOps challenges, provides an NL2SQL interface for admin, while providing games, telemetry, and a more private yet knowledgeable chatbot to the elderly in assisted living homes",
        main: true,
      },
      {
        href: "https://gist.github.com/danyshs/c60a04e034cd8a4fecc406d3bfb77c9a",
        imgsrc: "bg-kh_pic",
        hoverimgsrc: "group-hover:bg-cyan-900 duration-500 bg-contain",
        alt: "NOblivion",
        altdesc: "A File manager that can enforce your organization rules, suggest new rules based off of your fuzzy requests, and present a virtual environment so you can see what the end result of the organization would be before you go through with it",
        main: false,
      },


      // Add more projects here...
    ],
  },
  {
    title: "Research",
    projects: [
      {
        href: "https://www.researchgate.net/publication/395541308_A_Traditional_Approach_to_Symbolic_Piano_Continuation",
        imgsrc: "bg-kh_pic",
        hoverimgsrc: "group-hover:bg-blue-800 duration-500 bg-contain",
        alt: "A Traditional Approach to Symbolic Piano Continuation",
        altdesc: "AI Research, where we completed a MIDI piano tune with a Generative AI model to demonstrate that a 20M-parameter decoder-only model could achieve comparable performance to a 780M-parameter transformer.",
        main: true,
      },
            // Add more projects here...
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
        altdesc: "placeholder",
        main: false,
      },
      {
        href: "./",
        imgsrc: "bg-danyshs_work",
        hoverimgsrc: "group-hover:bg-cyan-900 duration-500 bg-contain",
        alt: "danyshs_work",
        altdesc: "Recursion?",
        main: false,
      },
      // Add more projects here...
    ],
  },
  /*{
    title: "Videos",
    projects: [
      {
        href: "./projects/example",
        imgsrc: "bg-my_pic",
        hoverimgsrc: "group-hover:bg-blue-700 duration-500 bg-contain",
        alt: "example",
        main: false,
      },
      {
        href: "./projects/example",
        imgsrc: "bg-my_pic",
        hoverimgsrc: "group-hover:bg-cyan-900 duration-500 bg-contain",
        alt: "also example",
        main: false,
      },
      // Add more projects here...
    ],
  },*/
];
