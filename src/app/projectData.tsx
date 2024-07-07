// ./src/app/projectData.ts

export interface Card {
  href: string;
  imgsrc: string;
  hoverimgsrc: string;
  alt?: string;
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
        imgsrc: "bg-surprise5",
        hoverimgsrc: "group-hover:bg-black duration-500 bg-contain",
        alt: "expense_tracker_util",
        main: false,
      },
      {
        href: "./projects/gmail_sorting",
        imgsrc: "bg-surprise6",
        hoverimgsrc: "group-hover:bg-black duration-500 bg-contain",
        alt: "gmail_sorting",
      },
      {
        href: "./projects/gmail_sorting",
        imgsrc: "bg-surprise3",
        hoverimgsrc: "group-hover:bg-black duration-500 bg-contain",
        alt: "gmail_sorting",
        main: true,
      },
      {
        href: "./projects/gmail_sorting",
        imgsrc: "bg-surprise",
        hoverimgsrc: "group-hover:bg-black duration-500 bg-contain",
        alt: "gmail_sorting",
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
        main: true,
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
  {
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
        main: true,
      },
      // Add more projects here...
    ],
  },
];
