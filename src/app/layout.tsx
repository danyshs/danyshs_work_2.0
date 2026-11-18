import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {
  fourbnt,
  computer_pixel_7,
  cube,
  kingdom_hearts_font,
  outline_pixel_7,
  outline_pixel_7_solid,
  spaider,
  cd_icons,
  minecraft,
  pixarrows,
  pixel_icons_compilation,
  spaiders,
} from "./fonts";

const inter = Inter({ subsets: ["latin"] });
const fontClasses = [
  inter.className,
  ...[
    fourbnt,
    computer_pixel_7,
    cube,
    kingdom_hearts_font,
    outline_pixel_7,
    outline_pixel_7_solid,
    spaider,
    cd_icons,
    minecraft,
    pixarrows,
    pixel_icons_compilation,
    spaiders,
  ].map((font) => font.variable),
].join(" ");

export const metadata: Metadata = {
  title: "^-^",
  description: "The Cavern of Remembrance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fontClasses}>
        {children}
      </body>
    </html>
  );
}
