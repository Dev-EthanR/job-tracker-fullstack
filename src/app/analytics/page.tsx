import { prisma } from "@/prisma/lib/prisma";
import AnalyticsWrapper from "./AnalyticsWrapper";
import BarGraph from "./components/BarGraph";
import NumberStats from "./components/NumberStats";
import useTheme from "@/src/hooks/useTheme";
import { redirect } from "next/navigation";
import { auth } from "../auth/auth";

const page = async () => {
  const session = await auth();

  if (!session) redirect("/auth");
  const data = await prisma.application.findMany({
    where: {
      userId: session?.user?.id,
    },
  });

  return (
    <AnalyticsWrapper>
      <NumberStats data={data} />
      <BarGraph data={data} />
    </AnalyticsWrapper>
  );
};

export default page;
