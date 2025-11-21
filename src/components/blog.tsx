// ./src/app/BlogSection.tsx

import React from "react";

const BlogSection: React.FC = () => {
  return (
    {
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
    }
    <>
      <div className="text-4xl text-center text-cyan-900 font-outlinepx bg-black w-full p-2">
        Hi! I'm Danysh
      </div>
      <div className="w-full flex justify-center">
        <div className="bg-gradient-to-b from-black/25 to-black/75 w-full max-w-4xl px-6 md:px-16 break-words">
          <div className="text-3xl md:text-4xl text-white font-comp_pixel">
            <div className="text-white font-comp_pixel">
              I am an AI Researcher who aspires to develop games and one day, do my PhD in AI.
              I dream of a world where we use Generative AI in an ethical and sustainable way.
              <br /> Here's my contribution towards it:
            </div>
            <div className="pl-3">
              * a
              <a href="https://www.github.com/danyshs/gmail_sorting">
                <span className="text-green-900"> utility </span>
              </a>
              to automatically categorize and sort their email
              <br />* a
              <a href="https://www.github.com/danyshs/powerShell_Utilities">
                <span className="text-green-900">
                  {" "}
                  bunch of powershell scripts{" "}
                </span>
              </a>
              like a tree printer, screen rotator, or more convenient ways to
              reduce friction in one's workflow
              <br />* a
              <span className="text-green-900">
                {" "}
                Local LLM AI RAG using a &lt;4B Model
              </span>
              {" "}
              for saving time when reading lengthy documentation in PDFs
              <br />*
              <span className="text-green-900">
                {" "}
                My current ongoing project: "My Zettelkasten"
              </span>
              , which is a heavier Local LLM chatbot that Vectorizes my Obsidian notes directory for efficient data retrieval, showing exactly which excerpt is referenced.
              <br />


            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogSection;
