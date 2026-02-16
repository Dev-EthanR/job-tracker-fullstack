"use client";
import useTheme from "@/src/hooks/useTheme";
import Link from "next/link";
import { PropsWithChildren } from "react";

const ApplicationIdWrapper = ({ children }: PropsWithChildren) => {
  const { theme } = useTheme();

  return (
    <main
      className={`w-full ${theme === "dark" ? "bg-dark-primary text-dark-text" : "bg-white"}  overflow-hidden p-8`}
    >
      <Link
        href="/"
        className=" rounded-lg flex items-center justify-center w-30 py-3 text-xl font-medium bg-accent text-white hover:brightness-115 cursor-pointer select-none mb-6"
      >
        Go Back
      </Link>
      <div className="flex justify-center items-center h-full">{children}</div>
    </main>
  );
};

export default ApplicationIdWrapper;
