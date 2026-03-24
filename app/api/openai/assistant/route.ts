import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI();

export async function POST() {
  try {
    const assistant = await openai.beta.assistants.create({
      instructions:
      "You are a personal social worker tutor. When asked a question, please answer.",
      model: process.env.OPENAI_MODEL as string,
    });

    return NextResponse.json({ assistant });
  } catch (error) {
    return NextResponse.error();
  }
}
