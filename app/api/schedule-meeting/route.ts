import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const url = new URL(req.url);
  const email = url.searchParams.get("email");
  const type = url.searchParams.get("type");

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    const meeting = await prisma.meeting.findUnique({
      where: {
        email,
      },
    });

    if (!meeting) {
      return NextResponse.json({ isScheduled: false }, { status: 200 });
    }

    let isScheduled;
    if (type === "free") {
      isScheduled = meeting.free;
    } else if (type === "paid") {
      isScheduled = meeting.paid;
    } else {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }

    return NextResponse.json({ isScheduled }, { status: 200 });
  } catch (error) {
    throw new Error("Meeting not found.");
  }
}

export async function POST(req: NextRequest) {
  const json = await req.json();
  const { email, type } = json;

  try {
    const user = await prisma.meeting.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      const updateData: { free?: boolean; paid?: boolean } = {};
      if (type === "free") {
        updateData.free = true;
      } else {
        updateData.paid = true;
      }
      await prisma.meeting.update({
        where: {
          email: email,
        },
        data: updateData,
      });
    } else {
      const createData = {
        email,
        free: type === "free",
        paid: type === "paid",
      };
      await prisma.meeting.create({
        data: createData,
      });
    }
    return NextResponse.json({ message: "Success" });
  } catch (error) {
    throw new Error("User not found.");
  }
}
