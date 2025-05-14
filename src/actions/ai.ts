import { createOpenAI } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";
import { systemPrompt } from "./system-prompt.ts";

export async function generateQuery(input: string) {
  const openai = createOpenAI({
    compatibility: "strict",
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  });

  try {
    const result = await generateObject({
      model: openai("gpt-4o"),
      system: systemPrompt,
      prompt: `Generar la consulta necesaria para recuperar los datos que desea el usuario: ${input}`,
      schema: z.object({
        query: z.string(),
      }),
    });

    return result.object.query;
  } catch (error) {
    console.log(error);
    throw new Error("Failed fetching database");
  }
}
