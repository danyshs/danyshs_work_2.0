"use client";
import React, { useEffect, useState } from "react";
import { Card, my_contacts } from "./contactsData";
import preloadImages from "../../util/preloadImages";
import DanyshS from "../components/DanyshS";
import TitleText from "../components/TitleText";
import { playSound, charSoundMap } from "../../util/soundUtils";

const contacts_list = (contacts: Card[]): React.ReactNode[] => {
  return contacts.map((cont: Card, index: number) => (
    <a key={index} href={cont.href}>
      <div
        className={`ring-6 ring-blue-800/50 ${cont.imgsrc} ${cont.hoverimgsrc} md:w-16 md:h-16 w-12 h-12 mt-2 hover:scale-125 hover:ring-6 transition duration-75 bg-cover`}
      ></div>
    </a>
  ));
};

const Navbar: React.FC = () => {
  const [activeChar, setActiveChar] = useState<string | null>(null);

  useEffect(() => {
    preloadImages([
      "/img/lol2_gmail.webp",
      "/img/lol2_github.webp",
      "/img/lol2_linkedin.webp",
      "/img/lol2_twitterx.webp",
      "/img/lol2_youtube.webp",
    ]);

    const handleKeyPress = (event: KeyboardEvent) => {
      const char = event.key;
      if (charSoundMap[char]) {
        playSound(char, setActiveChar);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    if (activeChar) {
      const timer = setTimeout(() => setActiveChar(null), 500);
      return () => clearTimeout(timer);
    }
  }, [activeChar]);

  return (
    <div className="relative w-full preload-hover-images">
      <div className="absolute inset-0 bg-blue-400/50 h-full"></div>
      <div className="pt-2 w-full bg-gradient-to-b from-blue-300/75 to-blue-700 md:rounded-t-full border-2 border-black space-x-2 relative flex flex-col md:items-center md:justify-between items-center z-10">
        <div className="flex flex-col-reverse md:gap-y-0 gap-y-12 -mb-12 md:mb-0 md:flex-col items-center md:space-x-3">
          <DanyshS
            activeChar={activeChar}
            playSound={(char: string) => playSound(char, setActiveChar)}
          />
          <TitleText
            activeChar={activeChar}
            playSound={(char: string) => playSound(char, setActiveChar)}
          />
        </div>
        <div className="flex mt-12 items-center justify-center space-x-5 z-10 md:space-x-10">
          {contacts_list(my_contacts)}
        </div>
        <div className="w-full mt-2 bg-blue-transparent backdrop-blur-2xl mb-2"></div>
      </div>
      <div className="w-full h-2 bg-blue-800"></div>
      <div className="w-full h-1 bg-blue-600/50"></div>
      <div className="w-full h-0.5 bg-blue-400/50"></div>
    </div>
  );
};

export default Navbar;
