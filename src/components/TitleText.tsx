// ../components/TitleText.tsx

import React from "react";

const TitleText = ({
  activeChar,
  playSound,
}: {
  activeChar: string | null;
  playSound: (char: string) => void;
}) => {
  const text = "Developer\nAvid Videogame Enthusiast";
  return (
    <blockquote className="text-lg md:text-3xl text-white/80 select-none animate-bounce sm font-outlinepx italic text-center relative z-10 text-slate-900 break-inside-avoid-column max-h-2 md:mb-5">
      {text.split("").map((char, index) => {
        if (char === "D" || char === "S" || char === "d" || char === "s") {
          return (
            <span
              key={index}
              className={`hover:text-cyan-900 transition duration-300 ${
                activeChar === char ? "text-yellow-500" : ""
              } hover:text-cyan-900 hover:scale-110`}
              onClick={() => playSound(char)}
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

export default TitleText;
