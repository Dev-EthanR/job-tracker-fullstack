"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type JSX } from "react";
import useAnimateHeight from "../hooks/useAnimateHeight";
import usePreventScroll from "../hooks/usePreventScroll";
import useTheme from "../hooks/useTheme";
import { SignOut } from "./auth/components/SignOut";

const Navbar = () => {
  const pathname = usePathname();
  function getPathName(): string {
    if (pathname.endsWith("/")) return "My Applications";
    if (pathname.startsWith("/application/")) return "Application Details";
    return pathname.slice(1).charAt(0).toUpperCase() + pathname.slice(2);
  }

  if (pathname === "/auth") return null;

  const [open, setOpen] = useState<boolean>(false);
  const { height, contentRef } = useAnimateHeight(open);

  const { theme } = useTheme();
  const { data: session } = useSession();

  usePreventScroll(open);

  const navigations = (): JSX.Element => {
    return (
      <nav className={`flex gap-5 flex-col pt-18 h-screen `} id="nav">
        <Link
          href="."
          className={`${theme === "dark" ? "hover:text-dark-hover" : "hover:text-hover"}`}
        >
          My Applications
        </Link>
        <Link
          href="analytics"
          className={`${theme === "dark" ? "hover:text-dark-hover" : "hover:text-hover"}`}
        >
          Analytics
        </Link>
        <Link
          href="settings"
          className={`${theme === "dark" ? "hover:text-dark-hover" : "hover:text-hover"}`}
        >
          Settings
        </Link>
        {session?.user && (
          <SignOut
            style={`${theme === "dark" ? "hover:text-dark-hover" : "hover:text-hover"}`}
          />
        )}
      </nav>
    );
  };

  return (
    <>
      <header
        className={`${theme === "dark" ? "bg-dark-secondary text-dark-text" : "bg-secondary"} w-full md:hidden  z-100`}
      >
        <div className="flex justify-between p-2 items-center ">
          <h1 className="text-2xl font-bold">{getPathName()}</h1>
          <button
            onClick={() => setOpen((prev) => !prev)}
            aria-controls="nav"
            aria-expanded={open}
          >
            <Image
              className={`w-12 ${theme === "dark" && "invert"} select-none`}
              alt=""
              width={48}
              height={48}
              src={open ? "/menu-close.svg" : "/menu-open.svg"}
            />
          </button>
        </div>
        <div
          ref={(node) => {
            contentRef.current = node;
          }}
          style={{ height }}
          className="text-center overflow-hidden transition-[height] duration-300 ease-in-out"
        >
          {navigations()}
        </div>
      </header>
      <div
        className={`${theme === "dark" ? "bg-dark-secondary text-dark-text" : "bg-secondary"}  w-40 h-screen sticky top-0 p-2 z-10 hidden md:block`}
      >
        {navigations()}
      </div>
    </>
  );
};

export default Navbar;
