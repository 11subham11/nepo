import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { LineChart, Bell } from "lucide-react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "nepo",
  description: "A minimal social app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-50 text-zinc-900`}
      >
        {/* <header className="border-b bg-white sticky top-0 z-10">
					<div className="mx-auto max-w-3xl px-4 py-3 flex items-center gap-4">
						<Link href="/" className="flex items-center gap-2 font-semibold">
							<LineChart className="h-5 w-5 text-zinc-900" />
						</Link>
						<nav className="ml-auto flex items-center gap-4 text-sm">
							<Link href="/">Home</Link>
							<Link href="/profile">Profile</Link>
							<button aria-label="Notifications" className="relative inline-flex items-center justify-center">
								<Bell className="h-5 w-5" />
								<span className="absolute -top-2 -right-2 inline-flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] leading-none h-5 min-w-5 px-1">9+</span>
							</button>
						</nav>
					</div>
				</header> */}
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
