"use client";
import useTheme from "@/src/hooks/useTheme";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type ChangeEvent } from "react";
import AddModal from "./AddModal";

const Header = () => {
  const { theme } = useTheme();
  const [modalOpen, setModalOpen] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    const value = event.target.value;

    const params = new URLSearchParams();
    if (value === "all") {
      params.delete("filter");
    } else {
      params.set("filter", value);
    }
    const query = params.toString();

    router.replace(`/application/${query ? `?${query}` : ""}`);
  };

  return (
    <header
      className={`w-full flex justify-between items-start p-4 px-8 ${theme === "dark" ? "bg-[#2f3c54] text-dark-text" : "bg-[#e6e3e3] text-text"} `}
    >
      <div className="flex items-center gap-5 ">
        <h1 className="text-3xl font-bold invisible  md:visible">
          My Applications
        </h1>
        <div>
          <select
            onChange={handleSelectChange}
            value={searchParams.get("filter") || ""}
            aria-label="filter"
            className={`text-blue-500 `}
          >
            <option defaultValue="all" hidden>
              Filters
            </option>
            <option value="all">All</option>
            <option value="offer">Offer</option>
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>
      <button
        className="fixed bottom-5 left-1/2 -translate-x-1/2 z-10 rounded-full  md:static  md:translate-x-0 md:rounded-lg flex items-center justify-center w-60 py-3 text-xl font-medium bg-accent text-white hover:bg-hover transition-colors duration-200 cursor-pointer select-none"
        onClick={() => {
          setModalOpen(true);
        }}
      >
        <Image
          className="w-8 filter brightness-0 invert"
          width={32}
          height={32}
          src="/plus.svg"
          alt=""
        />
        Add Application
      </button>
      <AddModal open={modalOpen} setOpen={setModalOpen} />
    </header>
  );
};

export default Header;
