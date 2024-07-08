"use client";

import React, { useEffect } from "react";
import { my_contacts, Card } from "./contactsData";

// Function to preload images
const preloadImages = (imageUrls: string[]) => {
  imageUrls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
};

const Navbar: React.FC = () => {
  useEffect(() => {
    preloadImages([
      "/img/lol2_gmail.webp",
      "/img/lol2_github.webp",
      "/img/lol2_linkedin.webp",
      "/img/lol2_twitterx.webp",
      "/img/lol2_youtube.webp",
    ]);
  }, []);

  const DanyshS = () => {
    const text = "Danysh S";
    return (
      <div className="text-nowrap break-inside-avoid-column select-none font-comp_pixel relative z-10 md:text-6xl text-3xl text-cyan-900 flex items-center">
        <div
          className={`rounded-full ring-3 ring-blue-900/20 bg-my_pic relative z-10 hover:bg-kh_pic hover:bg-center hover:bg-contain w-10 h-10 md:w-20 md:h-20 bg-contain bg-center bg-no-repeat hover:ring-6 transition duration-300 hover:bg-no-repeat mr-2`}
        ></div>
        {text.split("").map((char, index) => (
          <span
            key={index}
            className="hover:text-purple-800 transition hover:scale-110 duration-300"
          >
            {char}
          </span>
        ))}
      </div>
    );
  };

  const TitleText = () => {
    const text = "Developer\nAvid Videogame Enthusiast";
    return (
      <blockquote className="text-lg md:text-3xl text-white/80 select-none animate-bounce sm font-outlinepx italic text-center relative z-10 text-slate-900 break-inside-avoid-column max-h-2 md:mb-5">
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

  const contacts_list = (contacts: Card[]): React.ReactNode[] => {
    return contacts.map((cont: Card, index: number) => (
      <a key={index} href={cont.href}>
        <div
          className={`ring-6 ring-blue-800/50 ${cont.imgsrc} ${cont.hoverimgsrc} md:w-16 md:h-16 w-12 h-12 mt-2 hover:scale-120 hover:ring-6 transition duration-300 bg-cover`}
        ></div>
      </a>
    ));
  };

  return (
    <div className="relative w-full preload-hover-images">
      <div className="absolute inset-0 bg-blue-400/50 h-full"></div>
      <div className="pt-2 w-full bg-gradient-to-b from-blue-300/75 to-blue-700 rounded-t-full space-x-2 relative flex flex-col md:items-center md:justify-between items-center z-10">
        <div className="flex flex-col items-center md:space-x-3">
          <DanyshS />
          <TitleText />
        </div>
        <div className="flex mt-12 items-center justify-center space-x-5 z-10 md:space-x-10">
          {contacts_list(my_contacts)}
        </div>
        <div className="w-full mt-2 bg-blue-transparent backdrop-blur-2xl mb-2"></div>
      </div>
    </div>
  );
};

export default Navbar;
