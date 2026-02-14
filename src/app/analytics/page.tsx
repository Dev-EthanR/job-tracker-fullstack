"use client";

import BarGraph from "./components/BarGraph";
import NumberStats from "./components/NumberStats";
import useTheme from "@/src/hooks/useTheme";

const page = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`w-full px-4 py-5 ${theme === "dark" ? "bg-dark-primary text-dark-text" : "bg-white"} h-screen pt-10 md:pt-0`}
    >
      <h1 className="text-3xl font-bold mb-8 hidden md:block">Analytics</h1>
      <main className="flex flex-col items-center gap-12">
        <NumberStats />
        <BarGraph />
      </main>
    </div>
  );
};

export default page;
