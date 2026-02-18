"use client";
import { Application } from "@/src/generated/prisma/client";
import useToast from "@/src/hooks/useToast";
import Form from "./form/Form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  card: Application;
  open: boolean;
  setOpen: (toggle: boolean) => void;
}

const EditModalContent = ({ card, open, setOpen }: Props) => {
  const { setToastOpen } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <Form
      id="edit"
      open={open}
      title="Edit Application"
      submitLabel="Save"
      defaultValues={card}
      onClose={() => setOpen(false)}
      onSubmit={async (formData) => {
        try {
          setLoading(true);
          await axios.patch(`/api/applications/${card.id}`, formData);
          router.refresh();
          setLoading(false);
          setToastOpen({
            open: true,
            message: "Successfully Updated Application",
            color: "bg-green-600",
          });
        } catch (error) {
          setLoading(false);
          console.log(error);
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

export default EditModalContent;
