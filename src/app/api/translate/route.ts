import { NextRequest, NextResponse } from "next/server";

const GT = "https://translate.googleapis.com/translate_a/single?client=gtx&dt=t";

async function translate(text: string, target: string): Promise<string> {
  const res = await fetch(`${GT}&sl=uz&tl=${target}&q=${encodeURIComponent(text)}`);
  if (!res.ok) return "";
  const data = await res.json();
  return (data?.[0]?.[0]?.[0] as string) || "";
}

export async function POST(req: NextRequest) {
  const { textUz } = await req.json();
  if (!textUz || textUz.trim().length === 0) {
    return NextResponse.json({ error: "textUz is required" }, { status: 400 });
  }

  try {
    const [en, ru] = await Promise.all([
      translate(textUz, "en"),
      translate(textUz, "ru"),
    ]);

    return NextResponse.json({ en, ru });
  } catch (err) {
    console.error("Translation error:", err);
    return NextResponse.json({ error: "Translation failed" }, { status: 500 });
  }
}
