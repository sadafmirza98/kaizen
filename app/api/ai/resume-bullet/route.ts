import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { role, task, action, result } = await req.json();

    const prompt = `You are an expert resume writer. Generate 4 powerful, ATS-optimized resume bullet points for the following experience.

Role: ${role}
Task/Situation: ${task}
Action taken: ${action}
${result ? `Context: ${result}` : ""}

Requirements:
- Start each bullet with a strong action verb
- Include quantifiable metrics where possible (estimate if not provided)
- Use the STAR method implicitly
- Keep each bullet to 1-2 lines
- Make them ATS-friendly with relevant keywords
- Sound professional and impactful

Return ONLY a JSON object: { "bullets": ["bullet1", "bullet2", "bullet3", "bullet4"] }`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const content = completion.choices[0].message.content ?? "{}";
    const data = JSON.parse(content);

    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
