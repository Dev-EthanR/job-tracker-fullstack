import useTheme from "@/src/hooks/useTheme";
import Image from "next/image";

interface Props {
  title: string;
  onClose: () => void;
}

const FormHeader = ({ title, onClose }: Props) => {
  const { theme } = useTheme();

  return (
    <div className="flex justify-between border-b border-gray-300 pb-2 mb-2">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <button
        aria-label="close"
        onClick={onClose}
        className="cursor-pointer"
        type="button"
      >
        <Image
          className={`w-5 ${theme === "dark" ? "invert  hover:invert-80" : "hover:invert-30"} transition-colors duration-200`}
          width={20}
          height={20}
          src="/menu-close.svg"
          alt=""
        />
      </button>
    </div>
  );
};

export default FormHeader;
