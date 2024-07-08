import React from "react";

const DanyshS = ({
  activeChar,
  playSound,
}: {
  activeChar: string | null;
  playSound: (char: string) => void;
}) => {
  const text = "Danysh_S";

  const getHighlightClass = (char: string) => {
    if (
      (char === "D" && activeChar === "d") ||
      (char === "_" && activeChar === "-") ||
      activeChar === char
    ) {
      return "text-purple-900 scale-125";
    }
    return "";
  };

  return (
    <div className="text-nowrap break-inside-avoid-column select-none font-comp_pixel relative z-10 md:text-6xl text-3xl text-cyan-900 flex items-center">
      <div
        className={`rounded-full ring-3 ring-blue-900/20 bg-my_pic relative z-10 hover:bg-kh_pic hover:bg-center hover:bg-contain w-10 h-10 md:w-20 md:h-20 bg-contain bg-center bg-no-repeat hover:ring-6 transition duration-300 hover:bg-no-repeat mr-2`}
      ></div>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className={`transition duration-900 ${getHighlightClass(
            char
          )} hover:text-purple-900 hover:scale-125`}
          onClick={() => playSound(char)}
        >
          {char}
        </span>
      ))}
    </div>
  );
};

export default DanyshS;
