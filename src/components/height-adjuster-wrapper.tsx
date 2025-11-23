// ./components/HeightAdjusterWrapper.tsx
"use client";

import dynamic from "next/dynamic";

const HeightAdjuster = dynamic(() => import("./height-adjuster"), {
  ssr: false,
});

export default function HeightAdjusterWrapper() {
  return <HeightAdjuster />;
}
