import { Howl } from "howler";

const NOTES = ["G5", "F5", "C6", "D6", "Eb6", "F6", "Bb5", "G6"] as const;
type Note = (typeof NOTES)[number];

// the keys that make up the tune in the easter egg (see blog.tsx)
const NOTE_FOR_KEY: ReadonlyMap<string, Note> = new Map<string, Note>([
  ["D", "D6"],
  ["a", "F5"],
  ["n", "C6"],
  ["y", "G5"],
  ["s", "Eb6"],
  ["h", "Bb5"],
  ["_", "F6"],
  ["-", "F6"],
  ["S", "G6"],
]);

// created on first play so the server render never builds audio objects
const howlForNote = new Map<Note, Howl>();

function howl(note: Note): Howl {
  const cached = howlForNote.get(note);
  if (cached !== undefined) return cached;
  const created = new Howl({ src: [`/sounds/${note.toLowerCase()}.mp3`] });
  howlForNote.set(note, created);
  if (howlForNote.size > NOTES.length) throw new Error("invariant: more sounds than notes");
  return created;
}

// keys with no note (e.g. the "d" in the title) do nothing
export function playKey(key: string, setActiveChar: (key: string) => void): void {
  const note = NOTE_FOR_KEY.get(key);
  if (note === undefined) return;
  setActiveChar(key);
  howl(note).play();
}
