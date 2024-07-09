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
        imgsrc: "bg-expense_tracker",
        hoverimgsrc: "group-hover:bg-black duration-500 bg-contain",
        alt: "expense_tracker_util",
        altdesc:
          "Reads the expenses and presents it in a nice way that is very nice to look at and lorem placeholder placeholder text",
        main: true,
      },
      {
        href: "./projects/gmail_sorting",
        imgsrc: "bg-gmail_sorting bg-black",
        hoverimgsrc: "group-hover:bg-black/50 duration-500 bg-contain",
        alt: "gmail_sorting",
        altdesc:
          "Scans through every unique email address, allows you to tag them and categorize them into folders",
        main: true,
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
        altdesc: "placeholder",
        main: false,
      },
      {
        href: "./projects",
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
