"use client";
import { v4 as uuidv4 } from "uuid";
import useAddModal from "@/src/hooks/useAddModal";
import useData from "@/src/hooks/useData";
import useToast from "@/src/hooks/useToast";
import Form from "./form/Form";
import axios from "axios";
import { useEffect, useState } from "react";

const AddModal = () => {
  const { modalOpen, setModalOpen } = useAddModal();
  // const { setData } = useData();
  const { setToastOpen } = useToast();
  const [defaultLabel, setDefaultLabel] = useState<string | null>("");

  useEffect(() => {
    setDefaultLabel(localStorage.getItem("defaultLabel"));
  }, []);

  return (
    <Form
      id="add"
      open={modalOpen}
      title="Add Application"
      submitLabel="Apply"
      defaultValues={{ status: defaultLabel || "" }}
      onClose={() => setModalOpen(false)}
      onSubmit={async (data) => {
        try {
          await axios.post("/api/applications", data);
          setToastOpen({
            open: true,
            message: "Successfully Added Application",
            color: "bg-green-600",
          });
        } catch (e) {
          console.log(e);
          setToastOpen({
            open: true,
            message: "An Error occured while trying to add application",
            color: "bg-red-600",
          });
        }
        setModalOpen(false);
      }}
    />
  );
};

export default AddModal;
