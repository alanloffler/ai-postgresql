import type { SupabaseClient } from "@supabase/supabase-js";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import type { IResult } from "../types/result.type";

export const useProfessionals = (supabase: SupabaseClient) => {
  const [data, setData] = useState<IResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const executeSql = useCallback(
    async (query: string) => {
      if (!query) return;

      try {
        setLoading(true);
        setError(null);
        setData(null);

        const { data: supabaseData, error: supabaseError } = await supabase.rpc(
          "execute_sql",
          {
            query_text: query,
          },
        );

        if (supabaseError) throw new Error("Error ejecutando la consulta SQL");
        console.log(supabaseData);
        setData(supabaseData);
        return supabaseData;
      } catch (error) {
        const errorMsg =
          error instanceof Error ? error : new Error("Error desconocido");
        setError(errorMsg);
        toast.error(errorMsg.message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [supabase],
  );

  return {
    data,
    loading,
    error,
    executeSql,
  };
};
