"use client";
import ColumnDetails from "@/src/entities/ColumnDetails";
import { DragEndEvent, DndContext } from "@dnd-kit/core";
import React from "react";
import Columns from "../components/Columns";
import { useSearchParams } from "next/navigation";
import { Application } from "@/src/generated/prisma/client";

const Content = ({ data }: { data: Application[] }) => {
  const searchParams = useSearchParams();
  const columns: ColumnDetails[] = [
    { id: "applied", title: "Applied", color: "bg-applied" },
    { id: "interview", title: "Interview", color: "bg-interview" },
    { id: "offer", title: "Offer", color: "bg-offer" },
    { id: "rejected", title: "Rejected", color: "bg-rejected" },
  ];

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const cardId = active.id as string;
    const columnTitle = over.id as string;

    // setData((prev) =>
    //   prev.map((card) =>
    //     card.id === cardId ? { ...card, label: columnTitle } : card,
    //   ),
    // );
  }
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 px-4 gap-y-4 pb-25 md:pb-0 ">
        {columns.map((column) =>
          searchParams.get("filter") === column.id || "all" ? (
            <Columns key={column.id} column={column} data={data} />
          ) : null,
        )}
      </div>
    </DndContext>
  );
};

export default Content;
