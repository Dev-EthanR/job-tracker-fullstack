import EditModalContent from "./EditModalContent";
import { Application } from "@/src/generated/prisma/client";

interface Props {
  cardId: string;
  data: Application[];
  open: boolean;
  setOpen: (toggle: boolean) => void;
}

const EditModal = ({ cardId, open, setOpen, data }: Props) => {
  const card = data.find((card) => card.id === cardId);
  if (!card) return null;

  return <EditModalContent card={card} open={open} setOpen={setOpen} />;
};

export default EditModal;
