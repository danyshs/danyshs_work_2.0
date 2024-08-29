// ./src/app/BlogSection.tsx

import React from "react";

const BlogSection: React.FC = () => {
  return (
    <>
      <div className="text-4xl text-center text-cyan-900 font-outlinepx bg-black w-full p-2">
        Hi! I'm Danysh
      </div>
      <div className="w-full flex justify-center">
        <div className="bg-gradient-to-b from-black/25 to-black/75 w-full max-w-4xl px-6 md:px-16 break-words">
          <div className="text-3xl md:text-4xl text-white font-comp_pixel">
            <div className="text-white font-comp_pixel">
              I make things that I feel can help everyone make their lives a
              little bit easier.
              <br /> Whether it's:
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
              <a href="">
                <span className="text-green-900">
                  {" "}
                  Local LLM AI RAG using a &lt;4B Model
                </span>
              </a>
              for saving time when reading lengthy documentation in PDFs
              <br />* My current ongoing project:
              <a href="">
                <span className="text-green-900">
                  {" "}
                  "My Zettelkasten"
                </span>
              </a>
              , which is a heavier Local LLM that Vectorizes my entire Obsidian notes directory and answers all my questions, showing me exactly which excerpt is being used as reference.
              <br />


            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogSection;
