import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const response = await fetch(
      `${process.env.DASHSCOPE_BASE_URL}/chat/completions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.DASHSCOPE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "qwen-plus",
          messages: [
            {
              role: "system",
              content:
                "You are a professional localization assistant. Translate Chinese UI or technical support text into English and Brazilian Portuguese. Return valid JSON only with three fields: english, portuguese, explanation.",
            },
            {
              role: "user",
              content: `Translate this text:\n${text}`,
            },
          ],
          response_format: { type: "json_object" },
        }),
      }
    );

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json(
        { error: "No translation returned" },
        { status: 500 }
      );
    }

    const parsed = JSON.parse(content);

    return NextResponse.json({
      english: parsed.english || "",
      portuguese: parsed.portuguese || "",
      explanation: parsed.explanation || "",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Translation failed" }, { status: 500 });
  }
}