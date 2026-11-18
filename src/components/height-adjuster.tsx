"use client";

import { useEffect } from "react";

const DESKTOP_WIDTH_PX_MIN = 768; // Tailwind's md breakpoint

// evens out the two cards in each row of the two-column grid
export default function HeightAdjuster() {
  useEffect(() => {
    const adjustHeights = () => {
      if (window.innerWidth >= DESKTOP_WIDTH_PX_MIN) {
        const cards = document.querySelectorAll<HTMLElement>(".project-card");
        for (let i = 0; i < cards.length; i += 2) {
          const card1 = cards[i];
          const card2 = cards[i + 1];
          if (card1 && card2) {
            const maxHeight = Math.max(card1.offsetHeight, card2.offsetHeight);
            card1.style.height = `${maxHeight}px`;
            card2.style.height = `${maxHeight}px`;
          }
        }
      } else {
        const cards = document.querySelectorAll<HTMLElement>(".project-card");
        cards.forEach((card) => {
          card.style.height = "auto";
        });
      }
    };

    adjustHeights();
    window.addEventListener("resize", adjustHeights);
    return () => {
      window.removeEventListener("resize", adjustHeights);
    };
  }, []);

  return null;
}
