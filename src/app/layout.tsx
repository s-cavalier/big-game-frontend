import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const notoSans = Roboto({
  subsets: ['latin'],
  weight: ['300']
})

export const metadata: Metadata = {
  title: "The Big Game",
  description: "Web information for the BIG GAME",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${notoSans.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
