import { NextResponse } from 'next/server';


export async function POST(request: Request) {
    const json = await request.json();
    const { password } = json;
  try {
    if (password === process.env.OPENAI_PASSWORD) {
        return NextResponse.json({ status: 'ok' });
    }
  } catch (error) {
    return NextResponse.error();
  }
}
