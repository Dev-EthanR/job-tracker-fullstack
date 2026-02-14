import { useState } from "react";
import useTheme from "@/src/hooks/useTheme";
import Image from "next/image";

interface Props {
  setEditModal: (toggle: boolean) => void;
  setDeleteModal: (toggle: boolean) => void;
  deleteAction?: () => void;
}

const CardButton = ({ setEditModal, setDeleteModal, deleteAction }: Props) => {
  const [optionsOpened, setOpionsOpened] = useState<boolean>(false);
  const { theme } = useTheme();

  function modalOption(setModal: (option: boolean) => void): void {
    setOpionsOpened(false);
    setModal(true);
  }

  function handleDelete(): void {
    const deleteConfirmation = localStorage.getItem("deleteConfirmation");
    const confirmDelete = deleteConfirmation && JSON.parse(deleteConfirmation);

    if (confirmDelete) {
      modalOption(setDeleteModal);
    } else {
      if (deleteAction) deleteAction();
    }
  }

  return (
    <>
      <button
        aria-label="further card options"
        onClick={() => setOpionsOpened((prev) => !prev)}
      >
        <Image
          className={`w-7 transition-colors duration-300 cursor-pointer ease-out select-none ${theme === "dark" ? "invert hover:invert-80" : "hover:invert-30"}`}
          src="/three-dots.svg"
          alt=""
          width={28}
          height={28}
        />
      </button>
      {optionsOpened && (
        <div
          className={`absolute top-6 right-0 flex flex-col items-start ${theme === "dark" ? "bg-dark-primary border-gray-900 text-dark-text" : "bg-primary border-gray-200 text-text"}  rounded-md shadow-sm border w-22 px-2 py-1 text-sm gap-1`}
        >
          <button
            className={`${theme === "dark" ? "hover:bg-gray-900" : "hover:bg-gray-200"} w-full rounded-sm text-left cursor-pointer flex items-center gap-2`}
            onClick={() => modalOption(setEditModal)}
          >
            <Image
              className={`w-5 ${theme === "dark" && "invert"} select-none`}
              src="/edit.svg"
              alt=""
              width={20}
              height={20}
            />
            Edit
          </button>
          <button
            className={`${theme === "dark" ? "hover:bg-gray-900" : "hover:bg-gray-200"} w-full rounded-sm text-left cursor-pointer flex items-center gap-2`}
            onClick={handleDelete}
          >
            <Image
              className={`w-5 ${theme === "dark" && "invert"} select-none`}
              src="trash.svg"
              alt=""
              width={20}
              height={20}
            />
            Delete
          </button>
        </div>
      )}
    </>
  );
};

export default CardButton;
