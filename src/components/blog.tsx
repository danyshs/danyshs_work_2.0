import Link from "next/link";

interface WorkLink {
  href: string;
  name: string;
  summary: string;
}

// keep in step with the visible cards in project-data.tsx
const WORK_LINKS: WorkLink[] = [
  {
    href: "https://github.com/danyshs/winlator-app",
    name: "Winlator & Mesa (Pixel Graphics)",
    summary:
      "low-level graphics and Vulkan forwarding fixes to run Windows games on a Pixel's PowerVR GPU (Mesa Zink, Vortek, Wine)",
  },
  {
    href: "./projects/autonomous-agent-guardrails",
    name: "AI Agent Engineering & Tooling",
    summary:
      "systems architecture for autonomous coding agents: trajectory batch analysis, deterministic spend/turn guards, custom agent skills, antagonist/protagonist review passes, and Tiger Style contract verification",
  },
  {
    href:
      "https://www.researchgate.net/publication/" +
      "395541308_A_Traditional_Approach_to_Symbolic_Piano_Continuation",
    name: "A Traditional Approach to Symbolic Piano Continuation",
    summary:
      "our MIREX 2025 entry, a 20M-parameter RWKV-7 that tied a 39× larger " +
      "transformer in a double-blind listening test (co-author)",
  },
  {
    href: "https://github.com/A-Ricemusic/Developer-Week-Hackathon-2025-Caregiver",
    name: "CareGiver",
    summary:
      "a natural-language-to-SQL admin interface for an assisted living home; " +
      "1st place in the Oracle and Pliops challenges at DeveloperWeek 2025 (team project)",
  },
  {
    href: "https://gist.github.com/danyshs/c60a04e034cd8a4fecc406d3bfb77c9a",
    name: "DiscWhisper",
    summary: "live closed captions, color-coded by speaker, for chaotic multi-voice calls",
  },
];

export default function BlogSection() {
  return (
    <>
      <div style={{ display: "none" }} aria-hidden="true" data-easter-egg="keyblade-master">
        Aha! I have found you in my Inspect Element / GitHub Repo
        For you, I have prepared a treat.
        On my website (assuming you don&apos;t have extensions hijacking your inputs)
        1. Capitalization matters
        2. Click anywhere on the website before inputting it
        3. Click anywhere on the website before inputting it
        4. Instead of typing the letters, there&apos;s an accessibility alternative of clicking
        on the letters of my name instead! ^^
        5. When characters have no spaces between them (like in the case of _S_), just press
        them all consecutively in one beat
        Code:
        n y a D
        n y a D
        s D S _S_
        s D n h
        With a 1 second delay between each note
        This tune inspires you with the determination of a Keyblade Master
      </div>
      <div className="text-4xl text-center text-cyan-900 font-outlinepx bg-black w-full p-2">
        Hi I&apos;m Danysh.
      </div>
      <div className="w-full flex justify-center">
        <div
          className={[
            "bg-gradient-to-b from-black/25 to-black/75",
            "w-full max-w-4xl px-6 md:px-16 py-6 break-words",
          ].join(" ")}
        >
          <div className="text-3xl md:text-4xl text-white font-comp_pixel space-y-3">
            <p>
              I make the things I want to see in this world. One day, that&apos;ll be games.
            </p>
            <p>
              I dream of a world where we use Generative AI in an ethical and sustainable way.
            </p>
            <p>
              <span className="text-purple-900">So far, I&apos;ve worked on:</span>
            </p>
            <div className="pl-3 space-y-1">
              {WORK_LINKS.map((work) => (
                <div key={work.href}>
                  *{" "}
                  <a href={work.href}>
                    <span className="text-green-900 hover:underline">{work.name}</span>
                  </a>{" "}
                  - {work.summary}
                </div>
              ))}
            </div>
            <p>
              I write about all this on my{" "}
              <Link href="/blog">
                <span className="text-green-900 hover:underline">blog</span>
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
