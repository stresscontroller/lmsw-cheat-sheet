import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const json = await req.json();
  const { email } = json;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        password: true,
        plan: true,
      },
    });

    return NextResponse.json({ user });
  } catch (error) {
    throw new Error("User not found.");
  }
}
