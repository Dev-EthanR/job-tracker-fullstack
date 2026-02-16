"use client";
import useToast from "@/src/hooks/useToast";
import axios from "axios";
import { useState } from "react";
import DeleteModal from "../../components/DeleteModal";
import Container from "./Container";

const ClearData = () => {
  const { setToastOpen } = useToast();
  const clearData = async () => {
    try {
      await axios.delete("/api/applications");
      setToastOpen({
        open: true,
        message: "Successfully Deleted Data",
        color: "bg-red-600",
      });
    } catch (error) {
      console.error("Error deleting data:", error);
      setToastOpen({
        open: true,
        message: "An Error Occured",
        color: "bg-red-600",
      });
    }
  };
  const [confirmationModal, setConfirmationModal] = useState<boolean>(false);
  return (
    <Container title="Clear Data">
      <button
        className="border bg-[#da594d] hover:bg-[#df7b72] text-white px-4 py-0.5 cursor-pointer rounded-md"
        onClick={() => setConfirmationModal(true)}
      >
        Clear
      </button>
      <DeleteModal
        deleteAction={clearData}
        open={confirmationModal}
        setOpen={setConfirmationModal}
        heading="Delete Data"
      >
        Are you sure you want to delete all your data
        <br /> This action cannot be undone
      </DeleteModal>
    </Container>
  );
};

export default ClearData;
