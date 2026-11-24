import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const input = await req.json().catch(() => null);
  if (typeof input?.text !== 'string' || !input.text.trim() || input.text.length > 10_000) {
    return NextResponse.json({ success: false, error: 'Enter text to edit.' }, { status: 400 });
  }

  const { text, instruction } = input;
  if (instruction === 'punchier') {
    return NextResponse.json({ success: true, rewritten: text.replace(/(?:\r?\n)+/g, '\n\n') });
  }
  if (instruction === 'shorten') {
    const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g);
    return NextResponse.json({ success: true, rewritten: sentences?.slice(0, 3).join('').trim() || text });
  }
  return NextResponse.json({ success: false, error: 'Choose a supported edit. Add factual claims only with a source.' }, { status: 400 });
}
