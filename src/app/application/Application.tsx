import { prisma } from "@/prisma/lib/prisma";
import NotFound from "@/src/app/components/NotFound";
import Content from "./Content";
import { auth } from "../auth/auth";

const Application = async () => {
  const session = await auth();

  if (!session?.user) return null;

  const data = await prisma.application.findMany({
    where: {
      userId: session?.user?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (data.length <= 0)
    return (
      <NotFound
        heading="No applications yet"
        subtext="Get started by adding your first job application"
        type="main"
      />
    );

  return <Content data={data} />;
};

export default Application;
