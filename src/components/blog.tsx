// ./src/app/BlogSection.tsx

import React from "react";

const BlogSection: React.FC = () => {
  return (
/*
 * Aha! I have found you in my Inspect Element / GitHub Repo
 * For you, I have prepared a treat.
 * On my website (assuming you don't have extensions hijacking your inputs)
 * 1. Capitalization matters
 * 2. Click anywhere on the website before inputting it
 * 3. Click anywhere on the website before inputting it
 * 4. Instead of typing the letters, there's an accessibility alternative of clicking on the letters of my name instead! ^^
 * 5. When characters have no spaces between them (like in the case of _S_), just press them all consecutively in one beat
 *
 * Code:
 * n y a D
 * n y a D
 * s D S _S_ 
 * s D n h
 * With a 1 second delay between each note
 * This tune inspires you with the determination of a Keyblade Master 
 */
    <>
    <div className="text-4xl text-center text-cyan-900 font-outlinepx bg-black w-full p-2">
      Hi I&apos;m Danysh.
    </div>
      <div className="w-full flex justify-center">
        <div className="bg-gradient-to-b from-black/25 to-black/75 w-full max-w-4xl px-6 md:px-16 break-words">
          <br/>
          <div className="text-3xl md:text-4xl text-white font-comp_pixel">
            <div className="text-white font-comp_pixel">
              I make the things I want to see in this world. One day, that&apos;ll be games. Planning on applying to a PhD program once feasible.
              <br/>
              I dream of a world where we use Generative AI in an ethical and sustainable way.
              <br/>  <span className="text-purple-900"> So far, I've made: </span>
            </div>
            <div className="pl-3">
              *
              <a href="https://gist.github.com/danyshs/5477a1468e8810b6e703ee03f20400f2">
                <span className="text-green-900"> ZettelMancer </span>
              </a>
               - a personal wiki parser, which gives you exact quotes or files cited in response to your questions
              <br />
              *
              <a href="https://gist.github.com/danyshs/c60a04e034cd8a4fecc406d3bfb77c9a">
                <span className="text-green-900"> DiscWhisper </span>
              </a>
               - A closed caption generator that lets you differentiate between multiple speakers
              <br />
              *
              <a href="https://gist.github.com/danyshs/871bb786c31adfd06fb751627a8258eb">
                <span className="text-green-900"> NOblivion</span>
              </a>
               - A file manager that understands your natural language and helps you create rules, and shows you what your organization *would* look like in a virtual environment
              <br />
            </div>
          </div>
          <br/>
        </div>
      </div>
    </>
  );
};

export default BlogSection;
