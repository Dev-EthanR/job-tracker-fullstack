"use client";
import useTheme from "@/src/hooks/useTheme";
import { PropsWithChildren } from "react";

const AnalyticsWrapper = ({ children }: PropsWithChildren) => {
  const { theme } = useTheme();

  return (
    <div
      className={`w-full px-4 py-5 ${theme === "dark" ? "bg-dark-primary text-dark-text" : "bg-white"} h-screen pt-10 md:pt-0`}
    >
      <h1 className="text-3xl font-bold mb-8 hidden md:block">Analytics</h1>
      <main className="flex flex-col items-center gap-12">{children}</main>
    </div>
  );
};

export default AnalyticsWrapper;
