import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'CSSAnimator - Visual CSS Animation Creator | Clara AI',
  description: 'Create beautiful CSS animations visually with drag-and-drop timeline. Preview in real-time and export clean @keyframes code. Free online tool.',
  keywords: 'css animation, keyframes generator, animation tool, css animator, web animations',
  openGraph: {
    title: 'CSSAnimator - Visual CSS Animation Creator',
    description: 'Create CSS animations visually. Drag-and-drop timeline, real-time preview, clean code export.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
