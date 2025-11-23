// ./src/app/contactsData.tsx

export interface Card {
  href: string;
  imgsrc: string;
  hoverimgsrc: string;
  alt?: string;
}

export const my_contacts: Card[] = [
  {
    href: "https://github.com/danyshs",
    imgsrc: "bg-lol_github",
    hoverimgsrc: "hover:bg-lol2_github",
    alt: "danyshs",
  },
  {
    href: "mailto:danysh.3197@gmail.com",
    imgsrc: "bg-lol_gmail",
    hoverimgsrc: "hover:bg-lol2_gmail",
    alt: "danysh.3197@gmail.com",
  },
  {
    href: "https://linkedin.com/in/danyshs",
    imgsrc: "bg-lol_linkedin",
    hoverimgsrc: "hover:bg-lol2_linkedin",
    alt: "danyshs",
  },
  {
    href: "https://twitter.com/DSCodes_",
    imgsrc: "bg-lol_twitterx",
    hoverimgsrc: "hover:bg-lol2_twitterx",
    alt: "DSCodes_",
  },
  {
    href: "https://www.youtube.com/channel/UCkChpzvZufaKbXfrHzfMZHQ",
    imgsrc: "bg-lol_youtube",
    hoverimgsrc: "hover:bg-lol2_youtube",
    alt: "DS Codes",
  },
];
