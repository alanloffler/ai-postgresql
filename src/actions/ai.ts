import { createOpenAI } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";
import { systemPrompt } from "./system-prompt.ts";

const openai = createOpenAI({
  compatibility: "strict",
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});

export async function generateQuery(input: string): Promise<string> {
  if (!input.trim()) {
    throw new Error("El input no puede estar vacío");
  }

  try {
    const result = await generateObject({
      model: openai("gpt-4o"),
      system: systemPrompt,
      prompt: `Generar la consulta necesaria para recuperar los datos que desea el usuario: ${input}`,
      schema: z.object({
        query: z.string(),
      }),
    });

    console.log(result.object.query);

    return result.object.query;
  } catch (error) {
    console.log(error);
    throw new Error("AI | Error generando la consulta SQL");
  }
}
