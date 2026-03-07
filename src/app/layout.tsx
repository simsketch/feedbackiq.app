import type { Metadata } from "next";
import { IBM_Plex_Mono, DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "FeedbackIQ — Turn user feedback into pull requests",
  description:
    "Drop a widget on your site. Collect feedback from real users. Our AI agent reads your codebase and ships a PR. Feedback to code, automatically.",
  openGraph: {
    title: "FeedbackIQ — Turn user feedback into pull requests",
    description:
      "Drop a widget on your site. Collect feedback from real users. Our AI agent reads your codebase and ships a PR.",
    url: "https://feedbackiq.app",
    siteName: "FeedbackIQ",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${plexMono.variable} antialiased bg-[#09090b] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
