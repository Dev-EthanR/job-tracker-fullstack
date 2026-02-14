import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/lib/prisma";

export async function GET() {
  const applications = await prisma.application.findMany();
  return NextResponse.json(applications);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newApp = await prisma.application.create({
      data: {
        company: body.company,
        role: body.role,
        status: body.status || "APPLIED",
        notes: body.notes || "",
      },
    });
    return NextResponse.json(newApp, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to create Application" },
      { status: 500 },
    );
  }
}
