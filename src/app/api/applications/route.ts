import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/lib/prisma";
import { schema } from "@/src/utilities/schema";
import { auth } from "../../auth/auth";

export async function GET(req: NextRequest) {
  const data = await prisma.application.findMany();
  return NextResponse.json(data, { status: 200 });
}

export async function POST(req: NextRequest) {
  const session = await auth();

  try {
    const body = await req.json();

    const validation = schema.safeParse(body);
    if (!validation.success)
      return NextResponse.json(validation.error.format(), { status: 400 });
    const newApp = await prisma.application.create({
      data: {
        company: body.company,
        position: body.position,
        status: body.status || "APPLIED",
        date: body.date,
        notes: body.notes || "",
        userId: session?.user?.id,
      },
    });
    return NextResponse.json(newApp, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to create Application", err },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  const session = await auth();

  try {
    const deleteCount = await prisma.application.deleteMany({
      where: {
        userId: session?.user?.id,
      },
    });
    return NextResponse.json(
      { message: `Deleted ${deleteCount.count} applications` },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to delete records", err },
      { status: 500 },
    );
  }
}
