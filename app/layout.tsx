import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { Player } from "@/components/Player";
import { RightSidebar } from "@/components/RightSidebar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Music — Listen Now",
  description: "A premium music streaming experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} antialiased bg-black text-[#f5f5f7] font-sans`}
      >
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <aside className="hidden md:block w-[260px] shrink-0 z-20">
            <Sidebar />
          </aside>

          {/* Main Content */}
          <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
            <div className="flex-1 overflow-y-auto pb-24 scroll-smooth">
              {children}
            </div>
          </main>

          {/* Right Sidebar */}
          <aside className="hidden xl:block w-[340px] shrink-0 z-20">
            <RightSidebar />
          </aside>

          {/* Player */}
          <Player />
        </div>
      </body>
    </html>
  );
}
