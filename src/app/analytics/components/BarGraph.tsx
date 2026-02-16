"use client";
import type { ChartOptions } from "chart.js";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import useTheme from "@/src/hooks/useTheme";
import { Application } from "@/src/generated/prisma/client";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface DataSets {
  label: string;
  data: number[];
  backgroundColor: string[];
}

interface GraphType {
  labels: string[];
  datasets: DataSets[];
}

const BarGraph = ({ data }: { data: Application[] }) => {
  const { theme } = useTheme();

  function dataLength(status: string): number {
    return data.filter((d) => d.status === status).length;
  }

  const labels = ["Applied", "Interview", "Offer", "Rejected"];

  // get Lengths for each label
  const newData: number[] = [
    dataLength("APPLIED"),
    dataLength("INTERVIEW"),
    dataLength("OFFER"),
    dataLength("REJECTED"),
  ];

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        align: "start",
        labels: {
          boxWidth: 0,
          boxHeight: 0,
          font: {
            family: "Inter, system-ui, sans-serif",
            size: 20,
            weight: "bolder",
          },
          color: theme === "dark" ? "#cad2de" : "#31394e",
        },
      },
      tooltip: {
        callbacks: {
          title: () => "",
          label: (item) => `${labels[item.dataIndex]}: ${item.parsed.y}`,
        },
      },
    },
    animation: {
      delay: (context: any) => {
        if (context.type === "data" && context.mode === "default") {
          return context.dataIndex * 150;
        }
        return 0;
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
          stepSize: 1,
          color: theme === "dark" ? "#cad2de" : "#31394e",
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
      x: {
        ticks: {
          color: theme === "dark" ? "#cad2de" : "#31394e",
          font: {
            size: 16,
            weight: "bold",
          },
        },
      },
    },
  };

  const graphData: GraphType = {
    labels,
    datasets: [
      {
        label: "Applications by status",
        data: newData,
        backgroundColor: [
          "rgba(93, 93, 227, 1)",
          "rgba(222, 138, 44, 1)",
          "rgba(71, 197, 222, 1)",
          "rgba(222, 24, 67, 1)",
        ],
      },
    ],
  };

  return (
    <Bar
      className={`max-w-375 flex max-h-150 ${theme === "dark" ? "bg-dark-primary shadow-gray-950" : "bg-primary shadow-gray-300"} rounded-lg shadow-md  p-5`}
      options={options}
      data={graphData}
    />
  );
};

export default BarGraph;
