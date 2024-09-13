import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Inside 360",
  description: "",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "next14", "pwa", "next-pwa"],
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  authors: [
    {
      name: "ambleaChileTeamDevelopers",
      url: "https://www.jw.org/",
    },
  ],
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: [
    { rel: "apple-touch-icon", url: "icons/icon-128x128.png" },
    { rel: "icon", url: "icons/icon-128x128.png" },
  ],
};


export default function Home() {
  return (
    <main className="flex  flex-col items-center justify-between ">
      
    </main>
  );
}