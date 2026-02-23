"use client";
import ColumnDetails from "@/src/entities/ColumnDetails";
import { Application, Status } from "@/src/generated/prisma/client";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Columns from "../components/Columns";

const Content = ({ data }: { data: Application[] }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [applications, setApplications] = useState(data);

  useEffect(() => {
    setApplications(data);
  }, [data]);

  const columns: ColumnDetails[] = [
    { id: "applied", title: "Applied", color: "bg-applied" },
    { id: "interview", title: "Interview", color: "bg-interview" },
    { id: "offer", title: "Offer", color: "bg-offer" },
    { id: "rejected", title: "Rejected", color: "bg-rejected" },
  ];

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;
    console.log("active:", active.id);
    console.log("over:", over.id);

    const cardId = active.id as string;
    const columnTitle = over.id as Status;
    setApplications((prev) =>
      prev.map((card) =>
        card.id === cardId ? { ...card, status: columnTitle } : card,
      ),
    );
    await axios.patch(`/api/applications/${cardId}/status`, {
      status: columnTitle.toUpperCase(),
    });
    router.refresh();
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 px-4 gap-y-4 pb-25 md:pb-0 ">
        {columns.map((column) =>
          searchParams.get("filter") === column.id.toLowerCase() ||
          searchParams.get("filter") === null ? (
            <Suspense key={column.id} fallback={<p>Loading...</p>}>
              <Columns key={column.id} column={column} data={applications} />
            </Suspense>
          ) : null,
        )}
      </div>
    </DndContext>
  );
};
export default Content;
