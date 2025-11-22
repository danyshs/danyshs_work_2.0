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
      <body
        className={`${inter.className} ${fourbnt.variable} ${computer_pixel_7.variable} ${cube.variable} ${kingdom_hearts_font.variable} ${outline_pixel_7.variable} ${outline_pixel_7_solid.variable} ${spaider.variable} ${cd_icons.variable} ${minecraft.variable} ${pixarrows.variable} ${pixel_icons_compilation.variable} ${spaiders.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
