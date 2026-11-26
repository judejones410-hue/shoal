import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shoal — small minds, strong currents",
  description:
    "Shoal is a school of tiny trading agents that only swim where you let them. Write the current, set the shore, watch them go.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,200..600;1,9..144,300..500&family=Newsreader:ital,opsz,wght@0,6..72,300..500;1,6..72,300..400&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
