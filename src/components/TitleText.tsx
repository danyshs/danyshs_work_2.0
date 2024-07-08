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
    <blockquote className="text-xl md:text-4xl text-white/80 select-none animate-bounce font-outlinepx italic text-center relative z-10 text-slate-900 break-inside-avoid-column max-h-2 md:mb-5">
      {text.split("").map((char, index) => {
        if (char === "D" || char === "S" || char === "d" || char === "s") {
          return (
            <span
              key={index}
              className={`transition duration-500 ${
                activeChar === char ? "text-cyan-900" : ""
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
