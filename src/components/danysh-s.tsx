import Link from "next/link";
import { usePathname } from "next/navigation";

const DanyshS = ({
  activeChar,
  playSound,
}: {
  activeChar: string | null;
  playSound: (char: string) => void;
}) => {
  const text = "Danysh_S";
  const pathname = usePathname();

  const getHighlightClass = (char: string) => {
    if (activeChar === char) {
      return "text-purple-900 scale-125 duration-75";
    }
    return "";
  };

  return (
    <div
      className={[
        "text-nowrap break-inside-avoid-column select-none font-comp_pixel",
        "relative z-10 md:text-6xl text-6xl text-cyan-900 flex items-center",
      ].join(" ")}
    >
      {pathname !== "/" && (
        <Link href="/" className="text-3xl md:text-6xl font-pixarrows text-cyan-900 cursor-pointer">
          a
        </Link>
      )}
      <div
        className={[
          "rounded-full ring-3 ring-blue-900/20 bg-my_pic relative z-10",
          "hover:bg-my_pic hover:bright hover:bg-center hover:bg-contain w-16",
          "h-16 md:w-20 md:h-20 bg-contain bg-center bg-no-repeat hover:ring-6",
          "transition duration-300 mr-2",
        ].join(" ")}
      ></div>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className={`transition duration-300 ${getHighlightClass(
            char
          )} hover:text-purple-900 hover:scale-125`}
          onClick={() => playSound(char)}
        >
          {char}
        </span>
      ))}
      {pathname === "/" && (
        <div className="text-lg flex font-pixarrows text-cyan-900">
          a
          <div className="text-lg md:text-xl font-mono text-cyan-900">Type</div>
        </div>
      )}
    </div>
  );
};

export default DanyshS;
