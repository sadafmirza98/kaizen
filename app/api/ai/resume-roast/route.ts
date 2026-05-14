import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { resumeText, targetRole } = await req.json();

    const prompt = `You are a brutally honest but constructive hiring manager and resume expert. Analyze this resume and provide detailed feedback.

${targetRole ? `Target Role: ${targetRole}` : ""}

Resume:
${resumeText}

Provide a comprehensive analysis. Be direct and specific — not generic.

Return ONLY a JSON object:
{
  "score": <number 0-100>,
  "summary": "<2-3 sentence overall assessment>",
  "strengths": ["<specific strength 1>", "<specific strength 2>", "<specific strength 3>"],
  "weaknesses": ["<specific weakness 1>", "<specific weakness 2>", "<specific weakness 3>"],
  "suggestions": ["<actionable suggestion 1>", "<actionable suggestion 2>", "<actionable suggestion 3>", "<actionable suggestion 4>", "<actionable suggestion 5>"]
}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      temperature: 0.6,
    });

    const content = completion.choices[0].message.content ?? "{}";
    const data = JSON.parse(content);

    return NextResponse.json({ result: data });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
