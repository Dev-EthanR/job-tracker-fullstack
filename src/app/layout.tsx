import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";
import Providers from "./Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Job Tracker",
  description: "track your job applications",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <main className="min-h-dvh w-full flex flex-col md:flex-row">
          <Providers>
            <Navbar />
            {children}
          </Providers>
        </main>
      </body>
    </html>
  );
}
