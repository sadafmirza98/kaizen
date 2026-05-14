import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { currentRole, skills, goal, currentHeadline } = await req.json();

    const prompt = `You are a LinkedIn optimization expert. Generate 5 magnetic LinkedIn headlines for this professional.

Current Role: ${currentRole}
Key Skills: ${skills}
${goal ? `Career Goal: ${goal}` : ""}
${currentHeadline ? `Current Headline: ${currentHeadline}` : ""}

Requirements:
- Each headline must be under 220 characters (LinkedIn limit)
- Mix different styles: value-focused, role-focused, achievement-focused
- Include relevant keywords for searchability
- Make them compelling and specific, not generic
- Avoid clichés like "passionate", "guru", "ninja", "rockstar"

Return ONLY a JSON object: { "headlines": ["headline1", "headline2", "headline3", "headline4", "headline5"] }`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      temperature: 0.8,
    });

    const content = completion.choices[0].message.content ?? "{}";
    const data = JSON.parse(content);

    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
