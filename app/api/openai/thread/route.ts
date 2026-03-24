import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI();

export async function GET() {
  try {
    const thread = await openai.beta.threads.create();
    return NextResponse.json({ thread });
  } catch (error) {
    return NextResponse.error();
  }
}

export async function POST(request: Request) {
  const json = await request.json();
  const { threadId, assistantId } = json;

  try {
    let run = await openai.beta.threads.runs.create(threadId, { assistant_id: 'asst_XBj3WkdG1VWmk7syjZVz18Ly' });
    while (run.status !== 'completed') {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Poll every 2s
      run = await openai.beta.threads.runs.retrieve(threadId, run.id);
    }

    const messages = await openai.beta.threads.messages.list(threadId);
    const latestMessage = messages.data[0];

    return NextResponse.json({ threadId: threadId, messages: latestMessage });
  } catch (error) {
    return NextResponse.error();
  }
}
