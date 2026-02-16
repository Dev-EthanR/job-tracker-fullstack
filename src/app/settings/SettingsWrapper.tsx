"use client";
import useTheme from "@/src/hooks/useTheme";
import { PropsWithChildren } from "react";

const SettingsWrapper = ({ children }: PropsWithChildren) => {
  const { theme } = useTheme();

  return (
    <div
      className={`p-4 h-dvh w-full ${theme === "dark" ? "bg-dark-primary text-dark-text" : "bg-white"}`}
    >
      <h1 className="text-4xl font-semibold hidden md:block">Settings</h1>
      <div className="border-b border-gray-300 w-full mb-4 pt-4"></div>
      <main className="flex flex-col gap-6">{children}</main>
    </div>
  );
};

export default SettingsWrapper;
