"use client";
import useTheme from "@/src/hooks/useTheme";
import { PropsWithChildren } from "react";
import Header from "../components/Header";

const ApplicationWrapper = ({ children }: PropsWithChildren) => {
  const { theme } = useTheme();

  return (
    <main
      className={`${theme === "dark" && "bg-dark-primary text-dark-text"} flex flex-col flex-1 `}
    >
      <Header />
      <section
        className={`flex-1 ${theme === "dark" ? "bg-dark-primary text-dark-text" : "bg-primary text-text"} pt-12 flex justify-center md:block`}
      >
        {children}
      </section>
    </main>
  );
};

export default ApplicationWrapper;
