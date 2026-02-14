import Image from "next/image";
import useTheme from "@/src/hooks/useTheme";

type Missing = "column" | "main";

interface Props {
  heading: string;
  subtext: string;
  type: Missing;
}

const NotFound = ({ heading, subtext, type }: Props) => {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <Image
        className={`${type === "column" ? "w-30" : "w-50 md:w-80"}`}
        width={120}
        height={120}
        src="/not-found.png"
        alt="No applications found"
      />
      <h1
        className={`font-bold text-2xl mb-2  ${type === "main" && "md:text-4xl"}`}
      >
        {heading}
      </h1>
      <p
        className={`${theme === "dark" ? "text-dark-subtext" : "text-subtext"} w-60 md:w-full md:text-base ${type === "main" && "md:text-lg"}`}
      >
        {subtext}
      </p>
    </div>
  );
};

export default NotFound;
