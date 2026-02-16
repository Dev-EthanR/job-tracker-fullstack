import { prisma } from "@/prisma/lib/prisma";
import AnalyticsWrapper from "./AnalyticsWrapper";
import BarGraph from "./components/BarGraph";
import NumberStats from "./components/NumberStats";
import useTheme from "@/src/hooks/useTheme";

const page = async () => {
  const data = await prisma.application.findMany();

  return (
    <AnalyticsWrapper>
      <NumberStats data={data} />
      <BarGraph data={data} />
    </AnalyticsWrapper>
  );
};

export default page;
