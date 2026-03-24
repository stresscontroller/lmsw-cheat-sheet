import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const json = await req.json();
  const { email, firstName, lastName } = json;

  try {
    await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        firstName,
        lastName,
      },
    });

    return NextResponse.json({ message: "Success" });
  } catch (error) {
    throw new Error("User not found.");
  }
}
