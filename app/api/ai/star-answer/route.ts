import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { question, experience, role } = await req.json();

    const prompt = `You are an expert interview coach. Create a compelling STAR-format answer for the following behavioral interview question.

Interview Question: ${question}
${role ? `Candidate Role: ${role}` : ""}
Candidate's Experience: ${experience}

Structure the answer using the STAR method:
- Situation: Set the scene (2-3 sentences)
- Task: Describe your responsibility (1-2 sentences)
- Action: Explain what YOU specifically did (3-4 sentences, use "I" not "we")
- Result: Quantify the outcome (2-3 sentences with metrics if possible)

Also provide a fullAnswer that combines all four parts naturally.

Return ONLY a JSON object:
{
  "situation": "...",
  "task": "...",
  "action": "...",
  "result": "...",
  "fullAnswer": "..."
}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const content = completion.choices[0].message.content ?? "{}";
    const data = JSON.parse(content);

    return NextResponse.json({ answer: data });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
