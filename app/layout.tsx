import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WEREWOLF ALPHA Admin",
  description: "Private operations dashboard for the WEREWOLF ALPHA rider community.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
