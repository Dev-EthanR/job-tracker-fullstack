import { Application } from "@/src/generated/prisma/client";
import StatBox from "./StatBox";

const NumberStats = ({ data }: { data: Application[] }) => {
  function dataLength(status: string): number {
    return data.filter((d) => d.status === status).length;
  }

  return (
    <div className="grid grid-cols-2  lg:grid-cols-4 gap-4 max-w-360 mx-auto">
      <StatBox
        count={data.length}
        description="Total Applications"
        logo="/notepad.png"
      />
      <StatBox
        count={dataLength("INTERVIEW")}
        description="Interviews"
        logo="/interview.png"
      />
      <StatBox
        count={dataLength("OFFER")}
        description="Offers"
        logo="/offer.png"
      />
      <StatBox
        count={dataLength("REJECTED")}
        description="Rejected"
        logo="/rejected.webp"
      />
    </div>
  );
};

export default NumberStats;
