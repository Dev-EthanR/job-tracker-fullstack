import { prisma } from "@/prisma/lib/prisma";
import { auth } from "@/src/app/auth/auth";
import { schema } from "@/src/utilities/schema";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const body = await req.json();
  const validation = schema.safeParse(body);
  const session = await auth();

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const { company, position, date, notes, status } = body;

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
      company,
      position,
      date,
      notes,
      status,
    },
  });

  return NextResponse.json(updatedApplication);
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const application = await prisma.application.findUnique({
    where: { id },
  });

  if (!application)
    return NextResponse.json({ error: "Invalid Application" }, { status: 404 });

  const updatedApplication = await prisma.application.delete({
    where: { id: application.id },
  });

  return NextResponse.json(updatedApplication);
}
