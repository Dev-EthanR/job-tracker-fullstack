"use client";
import useTheme from "@/src/hooks/useTheme";
import { PropsWithChildren } from "react";

const AuthWrapper = ({ children }: PropsWithChildren) => {
  const { theme } = useTheme();

  return (
    <div
      className={`p-4 h-dvh w-full ${theme === "dark" ? "bg-dark-primary text-dark-text" : "bg-white"}  overflow-hidden`}
    >
      <main className="flex flex-col gap-6 h-screen">{children}</main>
    </div>
  );
};

export default AuthWrapper;
