import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const json = await req.json();
  const { email, newPassword, oldPassword } = json;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user && (await bcrypt.compare(oldPassword, user.password))) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      try {
        await prisma.user.update({
          where: {
            email: email,
          },
          data: {
            password: hashedPassword,
          },
        });

        return NextResponse.json({ message: "Success" });
      } catch (error) {
        throw new Error("Error updating password.");
      }
    } else {
      throw new Error("Incorrect password.");
    }
  } catch (error) {
    throw new Error("User not found.");
  }
}
