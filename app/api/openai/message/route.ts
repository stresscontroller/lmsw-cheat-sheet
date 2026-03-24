// app/api/thread/messagesList/route.ts

import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { OpenAIMessage } from '@/types';
const openai = new OpenAI();

export async function GET(request: Request) {
    const url = new URL(request.url);
    const threadId = url.searchParams.get("threadId") ?? '';

  try {
    console.log('ThreadID ~~~~~~~~~~~~', threadId)
    
    const response = await openai.beta.threads.messages.list(threadId);
    const messages = response.data.map(message => {
      const { text } = message.content[0] as OpenAI.Beta.Threads.Messages.TextContentBlock;
      return {
        content: text.value,
        role: message.role,
      };
    });

    messages.reverse();
    return NextResponse.json({ messages });
  } catch (error) {
    return NextResponse.error();
  }
}

export async function POST(request: Request) {
    const { threadId, message }: { threadId: string; message: OpenAIMessage } = await request.json();
    try {
    const _message = await openai.beta.threads.messages.create(threadId, message);
    return NextResponse.json({ _message: {role: _message.role, content: _message.content} });
  } catch (error) {
    return NextResponse.error();
  }
}
