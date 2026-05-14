import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { projectName, techStack, whatItDoes, impact } = await req.json();

    const prompt = `You are an expert technical writer. Generate three versions of a project description for different contexts.

Project Name: ${projectName}
${techStack ? `Tech Stack: ${techStack}` : ""}
What it does: ${whatItDoes}
${impact ? `Impact/Results: ${impact}` : ""}

Generate:
1. Resume version: 1-2 concise bullet points, ATS-optimized, starts with action verb, includes metrics
2. GitHub README version: 2-3 sentences, technical, developer-focused, mentions tech stack
3. Portfolio version: 3-4 sentences, engaging narrative, highlights problem solved and impact

Return ONLY a JSON object:
{
  "descriptions": {
    "resume": "...",
    "github": "...",
    "portfolio": "..."
  }
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
