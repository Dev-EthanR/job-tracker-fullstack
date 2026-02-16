import CardInfo from "@/src/app/components/card/CardInfo";
import { prisma } from "@/prisma/lib/prisma";
import ApplicationIdWrapper from "./ApplicationIdWrapper";

interface Props {
  params: { id: string };
}

const page = async ({ params }: Props) => {
  const { id } = await params;
  const cardData = await prisma.application.findUnique({
    where: {
      id,
    },
  });
  if (!cardData) return null;
  return (
    <ApplicationIdWrapper>
      <CardInfo card={cardData} />
    </ApplicationIdWrapper>
  );
};

export default page;
