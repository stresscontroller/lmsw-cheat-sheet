import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const json = await req.json();
  const { email, firstName, lastName, state, zipCode, password, plan } = json;

  if (!email || !password) {
    return NextResponse.json({ message: "Email and password are required." }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        state,
        zipCode,
        password: hashedPassword,
        plan,
      },
    });

    return NextResponse.json({ id: user.id, email: user.email });
  } catch (error) {
    return NextResponse.json({ message: "Error creating user." }, { status: 500 });
  }
}
