import { generateQuery as generateAiQuery } from "@/actions/ai";
import { useCallback, useState } from "react";

export const useGenerateQuery = () => {
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const generateQuery = useCallback(async (input: string) => {
    if (!input.trim()) return null;

    try {
      setIsGenerating(true);
      const query = await generateAiQuery(input);
      console.log(query);

      return query;
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error : new Error("Error desconocido");
      console.log(error);

      throw errorMsg;
    } finally {
      setIsGenerating(false);
    }
  }, []);

  return {
    generateQuery,
    isGenerating,
  };
};
