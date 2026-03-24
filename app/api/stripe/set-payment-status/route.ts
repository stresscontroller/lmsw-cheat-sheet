import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const json = await req.json();
  const { firstName, lastName, email, password } = json;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          plan: "paid",
        },
      });
    } else {
      await prisma.user.create({
        data: {
          email,
          firstName,
          lastName,
          state: "",
          zipCode: "",
          password: hashedPassword,
          plan: "paid",
        },
      });
    }
    return NextResponse.json({ message: "Success" });
  } catch (error) {
    throw new Error("User not found.");
  }
}
