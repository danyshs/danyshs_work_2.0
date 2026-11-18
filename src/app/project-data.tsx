export interface ProjectCard {
  href: string;
  imgsrc: string;
  hoverimgsrc: string;
  alt?: string;
  altdesc?: string;
  main?: boolean;
}

export interface Section {
  title: string;
  projects: ProjectCard[];
}

export const my_sections: Section[] = [
  {
    title: "Personal Projects",
    projects: [
      /* hidden: placeholder text, no public repo
      {
        href: "./projects/expense_tracker_util",
        imgsrc: "bg-expense_tracker bg-black",
        hoverimgsrc: "group-hover:bg-black/50 duration-500 bg-contain",
        alt: "expense_tracker_util",
        altdesc:
          "Reads the expenses and presents it in a nice way that is very nice to look at " +
          "and lorem placeholder placeholder text",
        main: false,
      }, */
      {
        href: "./projects/gmail_sorting",
        imgsrc: "bg-gmail_sorting bg-black",
        hoverimgsrc: "group-hover:bg-black/50 duration-500 bg-contain",
        alt: "gmail_sorting",
        altdesc:
          "Scans through every unique email address, allows you to tag them " +
          "and categorize them into folders",
        main: false,
      },
    ],
  },
  {
    title: "Generative AI",
    projects: [
      {
        href: "https://github.com/danyshs/resume",
        imgsrc: "bg-kh_pic",
        hoverimgsrc: "group-hover:bg-cyan-900 duration-500 bg-contain",
        alt: "AI Agent Engineering & Tooling",
        altdesc:
          "End-to-end tooling and runtime harness for AI coding agents: batch trajectory analyzer, deterministic spend/turn guards, " +
          "custom Claude Code skills, antagonist/protagonist review protocols, and Tiger Style contract verification.",
        main: true,
      },
      {
        href: "https://gist.github.com/danyshs/c60a04e034cd8a4fecc406d3bfb77c9a",
        imgsrc: "bg-disc_whisp",
        hoverimgsrc: "group-hover:bg-cyan-900 duration-500 bg-contain",
        alt: "DiscWhisper",
        altdesc:
          "Live closed captions, color-coded by speaker, for chaotic multi-voice calls. Write-up.",
        main: false,
      },
      {
        href: "https://github.com/A-Ricemusic/Developer-Week-Hackathon-2025-Caregiver",
        imgsrc: "bg-kh_pic",
        hoverimgsrc: "group-hover:bg-cyan-900 duration-500 bg-contain",
        alt: "CareGiver",
        altdesc:
          "DeveloperWeek 2025: 1st place in the Oracle and Pliops challenges. " +
          "A natural-language-to-SQL admin interface for an assisted living home, plus games, " +
          "telemetry and a private chatbot for residents. " +
          "Team project; much of it lives in Oracle APEX, outside the repo.",
        main: true,
      },
    ],
  },
  {
    title: "Game Dev",
    projects: [
      {
        href: "https://github.com/danyshs/winlator-app",
        imgsrc: "bg-kh_pic",
        hoverimgsrc: "group-hover:bg-blue-800 duration-500 bg-contain",
        alt: "Winlator & Mesa (Pixel Graphics)",
        altdesc:
          "Running Windows PC games on a Pixel's PowerVR GPU. Mesa 22.2.5 Zink patches, Vortek Vulkan forwarding fixes, " +
          "explorer.exe reverse engineering, and custom USB controller pass-through.",
        main: true,
      },
      {
        href: "./",
        imgsrc: "bg-danyshs_work",
        hoverimgsrc: "group-hover:bg-cyan-900 duration-500 bg-contain",
        alt: "danyshs_work",
        altdesc: "Recursion?",
        main: false,
      },
    ],
  },
  {
    title: "Research",
    projects: [
      {
        href:
          "https://www.researchgate.net/publication/" +
          "395541308_A_Traditional_Approach_to_Symbolic_Piano_Continuation",
        imgsrc: "bg-kh_pic",
        hoverimgsrc: "group-hover:bg-blue-800 duration-500 bg-contain",
        alt: "A Traditional Approach to Symbolic Piano Continuation",
        altdesc:
          "MIREX 2025, co-author (EleutherAI SOAR). A 20M-parameter RWKV-7 that continues " +
          "piano pieces: tied a 39× larger 780M transformer and beat a 60× larger 1.2B one " +
          "in a double-blind listening test.",
        main: true,
      },
      {
        href: "https://arxiv.org/abs/2311.13494",
        imgsrc: "bg-kh_pic",
        hoverimgsrc: "group-hover:bg-blue-800 duration-500 bg-contain",
        alt: "A Comparative Analysis of Supportive Navigation on Movie Recommenders",
        altdesc:
          "An alternative Netflix-style interface that cuts down on endless scrolling, " +
          "with a user study (published as Danysh Syed).",
        main: false,
      },
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
    ],
  },*/
];
