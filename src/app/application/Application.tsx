import { prisma } from "@/prisma/lib/prisma";
import NotFound from "@/src/app/components/NotFound";
import Content from "./Content";

const Application = async () => {
  const data = await prisma.application.findMany({
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
