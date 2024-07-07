// ./src/app/navbar.tsx

import React from "react";

interface Card {
  href: string;
  imgsrc: string;
  hoverimgsrc: string;
  alt?: string;
}

interface NavbarProps {
  title: string;
}

const Navbar: React.FC<NavbarProps> = ({ title }) => {
  const DanyshS = () => {
    const text = "Danysh S";
    return (
      <div className="text-nowrap break-inside-avoid-column select-none font-comp_pixel relative z-10 md:text-6xl text-3xl text-cyan-900">
        {text.split("").map((char, index) => (
          <span
            key={index}
            className="hover:text-purple-800 transition hover:scale-150 duration-300"
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
      <blockquote className="text-lg md:text-3xl text-white/80 select-none animate-bounce sm font-outlinepx italic sm:text-left text-center relative z-10 text-slate-900 break-inside-avoid-column max-h-2">
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

  const my_contacts: Card[] = [
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

  const contacts_list = (contacts: Card[]): React.ReactNode[] => {
    return contacts.map((cont: Card, index: number) => (
      <a key={index} href={cont.href}>
        <div
          className={`rounded-full ring-6 ring-blue-800/50 ${cont.imgsrc} ${cont.hoverimgsrc} md:min-w-16 md:min-h-16 min-h-8 min-w-8 hover:scale-120 hover:ring-6 transition duration-300 bg-cover`}
        ></div>
      </a>
    ));
  };

  return (
    <div className="md:px-24 py-3 w-screen md:min-h-48 h-1/6 md:h-1/5 bg-gradient-to-b from-blue-300 to-blue-500 rounded-b-full space-x-3">
      <div className="md:flex z-50 md:items-center space-x-3">
        <div
          className={`rounded-full ring-3 ring-blue-900/20 bg-my_pic relative z-10 hover:bg-kh_pic hover:bg-center hover:bg-contain w-10 h-10 justify-center md:min-h-20 md:min-w-20 bg-contain bg-center bg-no-repeat hover:ring-6 transition duration-300 hover:bg-no-repeat`}
        ></div>
        <DanyshS />
        <div className="flex md:ml-auto w-screen items-center z-50 justify-end wrap md:space-x-6 space-x-2">
          {contacts_list(my_contacts)}
        </div>
      </div>
      <div className="w-full h-px bg-cyan-800/40 my-1"></div>
      <TitleText />
      <div className="relative -inset-y-4 flex items-center justify-center">
        <div className="font-khfont text-center text-transparent bg-clip-text bg-gradient-to-b from-cyan-900 to-blue-900 text-8xl">
          {title}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
