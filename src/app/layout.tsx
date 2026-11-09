import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "HireLoop — Find Your Dream Job Today",
  description: "HireLoop connects top talent with world-class companies.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} font-sans h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#010103] text-white font-sans">
        {children}
      </body>
    </html>
  );
}
