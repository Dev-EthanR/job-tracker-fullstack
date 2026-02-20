import { prisma } from "@/prisma/lib/prisma";
import { auth } from "@/src/app/auth/auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const body = await req.json();
  const session = await auth();

  const { status } = body;

  const { id } = await context.params;
  const application = await prisma.application.findUnique({
    where: { id },
  });

  if (!application)
    return NextResponse.json({ error: "Invalid Application" }, { status: 404 });

  if (application?.userId !== session?.user?.id)
    return NextResponse.json({ error: "Unauthorized Access" }, { status: 401 });
  const updatedApplication = await prisma.application.update({
    where: { id: application.id },
    data: {
      status,
    },
  });

  return NextResponse.json(updatedApplication);
}
