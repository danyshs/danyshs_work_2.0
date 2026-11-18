"use client";

import dynamic from "next/dynamic";

// client-only: it measures the DOM
const HeightAdjuster = dynamic(() => import("./height-adjuster"), {
  ssr: false,
});

export default function HeightAdjusterWrapper() {
  return <HeightAdjuster />;
}
