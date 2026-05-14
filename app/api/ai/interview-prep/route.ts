import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { role, skills, level } = await req.json();

    const prompt = `You are an expert technical interviewer. Generate 8 interview questions for the following candidate.

Role: ${role}
Experience Level: ${level}
${skills ? `Key Skills: ${skills}` : ""}

Generate a mix of:
- 3 behavioral questions (type: "behavioral")
- 3 technical questions (type: "technical")
- 2 situational questions (type: "situational")

For each question provide:
- A clear, specific question
- A hint (what the interviewer is looking for)
- A concise model answer (3-5 sentences)

Return ONLY a JSON object:
{
  "questions": [
    {
      "question": "...",
      "type": "behavioral" | "technical" | "situational",
      "hint": "...",
      "modelAnswer": "..."
    }
  ]
}`;

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
