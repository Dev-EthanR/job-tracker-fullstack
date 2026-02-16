"use client";
import useToast from "@/src/hooks/useToast";
import axios from "axios";
import { useEffect, useState } from "react";
import Form from "./form/Form";
import { useRouter } from "next/navigation";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const AddModal = ({ open, setOpen }: Props) => {
  const router = useRouter();

  const { setToastOpen } = useToast();
  const [loading, setLoading] = useState(false);

  return (
    <Form
      id="add"
      open={open}
      title="Add Application"
      submitLabel="Apply"
      onClose={() => setOpen(false)}
      onSubmit={async (data) => {
        try {
          setLoading(true);
          await axios.post("/api/applications", data);
          router.push("/application");
          router.refresh();
          setLoading(false);
          setToastOpen({
            open: true,
            message: "Successfully Added Application",
            color: "bg-green-600",
          });
        } catch (e) {
          setLoading(false);
          console.log(e);
          setToastOpen({
            open: true,
            message: "An Error occured while trying to add application",
            color: "bg-red-600",
          });
        }
        setOpen(false);
      }}
      loading={loading}
    />
  );
};

export default AddModal;
