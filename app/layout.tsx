import classNames from "@/helpers/classnames";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movie App",
  description: "Movie List App",
  manifest: "/manifest.webmanifest",
  icons: "/favicon.ico",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={classNames(inter.className, "w-screen overflow-y-auto")}>
        <nav className="h-16 bg-[#91770f] sticky top-0 z-50 shadow-lg">
          <div className="container mx-auto h-full flex items-center">
            <Link href={"/"} className="h-fit">
              <Image
                className="cursor-pointer"
                src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
                width={200}
                height={100}
                alt="logo"
              />
            </Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
