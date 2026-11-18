import React from "react";

const TitleText = ({
  activeChar,
  playSound,
}: {
  activeChar: string | null;
  playSound: (char: string) => void;
}) => {
  const text = "AI Researcher\nAvid Videogame Enthusiast";
  return (
    <blockquote
      className={[
        "text-xl md:text-4xl text-white/80 select-none animate-bounce",
        "font-outlinepx italic text-center relative z-10 text-slate-900",
        "break-inside-avoid-column max-h-2 md:mb-5",
      ].join(" ")}
    >
      {text.split("").map((char, index) => {
        if (["D", "S", "d", "s"].includes(char)) {
          const isHighlighted =
            (activeChar === "D" && (char === "D" || char === "d")) ||
            (activeChar === "S" && (char === "S" || char === "s"));

          return (
            <span
              key={index}
              className={`transition duration-300 ${isHighlighted ? "text-cyan-900 duration-75" : ""
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
