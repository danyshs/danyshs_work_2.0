"use client";
import { useEffect, useState } from "react";
import { my_contacts } from "./contacts-data";
import preloadImages from "../utils/preload-images";
import DanyshS from "../components/danysh-s";
import TitleText from "../components/title-text";
import { playKey } from "../utils/sound-utils";

export default function Navbar() {
  const [activeChar, setActiveChar] = useState<string | null>(null);

  useEffect(() => {
    preloadImages([
      "/img/lol2_gmail.webp",
      "/img/lol2_github.webp",
      "/img/lol2_linkedin.webp",
      "/img/lol2_twitterx.webp",
      "/img/lol2_youtube.webp",
    ]);

    const handleKeyPress = (event: KeyboardEvent) => playKey(event.key, setActiveChar);

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    if (activeChar === null) return;
    const timer = setTimeout(() => setActiveChar(null), 500); // highlight length
    return () => clearTimeout(timer);
  }, [activeChar]);

  const playChar = (char: string) => playKey(char, setActiveChar);

  return (
    <div className="relative w-full preload-hover-images">
      <div className="absolute inset-0 bg-blue-400/50 h-full"></div>
      <div
        className={[
          "pt-2 w-full bg-gradient-to-b from-blue-300/75 to-blue-700",
          "md:rounded-t-full border-2 border-black space-x-2 relative flex",
          "flex-col md:items-center md:justify-between items-center z-10",
        ].join(" ")}
      >
        <div
          className={[
            "flex flex-col-reverse md:gap-y-0 gap-y-12 -mb-12 md:mb-0 md:flex-col",
            "items-center md:space-x-3",
          ].join(" ")}
        >
          <DanyshS
            activeChar={activeChar}
            playSound={playChar}
          />
          <TitleText
            activeChar={activeChar}
            playSound={playChar}
          />
        </div>
        <div className="flex mt-12 items-center justify-center space-x-5 z-10 md:space-x-10">
          {my_contacts.map((contact) => (
            <a key={contact.href} href={contact.href}>
              <div
                className={[
                  "ring-6 ring-blue-800/50 md:w-16 md:h-16 w-12 h-12 mt-2",
                  "hover:scale-125 hover:ring-6 transition duration-75 bg-cover",
                  contact.imgsrc,
                  contact.hoverimgsrc,
                ].join(" ")}
              />
            </a>
          ))}
        </div>
        <div className="w-full mt-2 bg-blue-transparent backdrop-blur-2xl mb-2"></div>
      </div>
      <div className="w-full h-2 bg-blue-800"></div>
      <div className="w-full h-1 bg-blue-600/50"></div>
      <div className="w-full h-0.5 bg-blue-400/50"></div>
    </div>
  );
}
