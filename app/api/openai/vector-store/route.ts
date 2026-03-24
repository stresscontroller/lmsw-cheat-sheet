import { NextResponse } from "next/server";
import OpenAI from 'openai';

const openai = new OpenAI();

export async function POST() {
  try {
    const vectorStore = await openai.vectorStores.create({
      name: `rag-store-${new Date().toISOString()}`,
    });
    return NextResponse.json({ vectorStore });
  } catch (error) {
    return NextResponse.error();
  }
}
