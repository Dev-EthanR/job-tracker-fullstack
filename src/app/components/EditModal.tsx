import type Data from "@/src/entities/Data";
import useData from "@/src/hooks/useData";
import useToast from "@/src/hooks/useToast";
import Form from "./form/Form";

interface Props {
  cardId: string;
  open: boolean;
  setOpen: (toggle: boolean) => void;
}

const EditModal = ({ cardId, open, setOpen }: Props) => {
  const { data, setData } = useData();
  const { setToastOpen } = useToast();

  const card: Data | undefined = data.find((d) => d.id === cardId);

  if (!card) return null;

  return (
    <Form
      id="edit"
      open={open}
      title="Edit Application"
      submitLabel="Save"
      defaultValues={card}
      onClose={() => setOpen(false)}
      onSubmit={(formData) => {
        setOpen(false);
        setData((prev) =>
          prev.map((item) =>
            item.id === cardId ? { id: cardId, ...formData } : item,
          ),
        );
        setToastOpen({
          open: true,
          message: "Successfully Updated Application",
          color: "bg-green-600",
        });
      }}
    />
  );
};

export default EditModal;
