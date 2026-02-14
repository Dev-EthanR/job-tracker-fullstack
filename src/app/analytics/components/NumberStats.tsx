import StatBox from "./StatBox";
import useData from "@/src/hooks/useData";

const NumberStats = () => {
  const { data } = useData();

  function dataLength(label: string): number {
    return data.filter((d) => d.label === label).length;
  }

  return (
    <div className="grid grid-cols-2  lg:grid-cols-4 gap-4 max-w-360 mx-auto">
      <StatBox
        count={data.length}
        description="Total Applications"
        logo="/notepad.png"
      />
      <StatBox
        count={dataLength("Interview")}
        description="Interviews"
        logo="/interview.png"
      />
      <StatBox
        count={dataLength("Offer")}
        description="Offers"
        logo="/offer.png"
      />
      <StatBox
        count={dataLength("Rejected")}
        description="Rejected"
        logo="/rejected.webp"
      />
    </div>
  );
};

export default NumberStats;
