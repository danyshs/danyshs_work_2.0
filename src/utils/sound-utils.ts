// ./util/soundUtils.ts

import { Howl } from "howler";

export const soundMap: Record<string, Howl> = {
  G5: new Howl({ src: ["/sounds/g5.mp3"] }),
  F5: new Howl({ src: ["/sounds/f5.mp3"] }),
  C6: new Howl({ src: ["/sounds/c6.mp3"] }),
  D6: new Howl({ src: ["/sounds/d6.mp3"] }),
  Eb6: new Howl({ src: ["/sounds/eb6.mp3"] }),
  F6: new Howl({ src: ["/sounds/f6.mp3"] }),
  Bb5: new Howl({ src: ["/sounds/bb5.mp3"] }),
  G6: new Howl({ src: ["/sounds/g6.mp3"] }),
};

export const charSoundMap: Record<string, string> = {
  D: "D6",
  // d: "D6",
  a: "F5",
  n: "C6",
  y: "G5",
  s: "Eb6",
  h: "Bb5",
  _: "F6",
  "-": "F6",
  S: "G6",
};

export const playSound = (
  char: string,
  setActiveChar: React.Dispatch<React.SetStateAction<string | null>>
) => {
  setActiveChar(char);
  soundMap[charSoundMap[char]].play();
};
