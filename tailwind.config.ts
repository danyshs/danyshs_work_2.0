import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      backgroundImage: {
        my_pic: "url('/img/me.jpg')",
        kh_pic: "url('/img/og.png')",
        surprise: "url('/img/surprise.ico')",

        lol_github: "url('/img/lol_github.ico')",
        lol2_github: "url('/img/lol2_github.ico')",

        lol_gmail: "url('/img/lol_gmail.ico')",
        lol2_gmail: "url('/img/lol2_gmail.ico')",

        lol_linkedin: "url('/img/lol_linkedin.ico')",
        lol2_linkedin: "url('/img/lol2_linkedin.ico')",

        lol_twitterx: "url('/img/lol_twitterx.ico')",
        lol2_twitterx: "url('/img/lol2_twitterx.ico')",

        lol_youtube: "url('/img/lol_youtube.ico')",
        lol2_youtube: "url('/img/lol2_youtube.ico')",

        more_fried: "url('/img/deep_fried_more.png')",

        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        //FONTS
        fourbnt: ["fourbnt"],
        comp_pixel: ["computer_pixel-7"],
        cube: ["CUBE"],
        khfont: ["Kingdom_Hearts_Font"],
        outlinepx: ["outline_pixel-7"],
        outlinepx_solid: ["outline_pixel-7_solid"],

        //ICONS
        cdicons: ["cd_icons"],
        minecraft: ["minecraft"],
        pixarrows: ["PixArrows"],
        pixicons: ["pixel_icons_compilation"],
        spider: ["SPAIDER_"],
        spider_symbols: ["SPAIDERS"],
      },
      /*soundFiles: {
        D: "url('/sounds/Bb5.ogg')",
        a: "url('/sounds/C5.ogg')",
        n: "url('/sounds/D5.ogg')",
        y: "url('/sounds/Eb5.ogg')",
        s: "url('/sounds/F5.ogg')",
        h: "url('/sounds/G5.ogg')",
        space: "url('/sounds/F6.ogg')",
        S: "url('/sounds/G6.ogg')",
      },*/
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      black: "#000000",
      blue: {
        100: "#000011",
        200: "#000022",
        300: "#000033",
        400: "#000055",
        500: "#000077",
        600: "#000099",
        700: "#0000BB",
        800: "#0000DD",
        900: "#0000FF",
      },
      green: {
        100: "#001100",
        200: "#002200",
        300: "#003300",
        400: "#005500",
        500: "#007700",
        600: "#009900",
        700: "#00BB00",
        800: "#00DD00",
        900: "#00FF00",
      },
      cyan: {
        100: "#000611",
        200: "#001122",
        300: "#001733",
        400: "#002855",
        500: "#003877",
        600: "#004899",
        700: "#0064BB",
        800: "#0080DD",
        900: "#22BBFF",
      },
      purple: {
        special: "#FFFFFF",
        100: "#060011",
        200: "#110022",
        300: "#170033",
        350: "#200044",
        400: "#280055",
        500: "#380077",
        600: "#480099",
        700: "#6400BB",
        800: "#8000DD",
        900: "#AA00FF",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
