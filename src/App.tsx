import { DataTable } from "@components/DataTable";
import { Search } from "@components/Search";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Toaster } from "@components/ui/sonner";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import { toast } from "sonner";
import { generateQuery } from "./actions/ai";
import type { IResult } from "./types/result.type.ts";
import { useGenerateQuery } from "@hooks/useGenerateQuery.ts";
import { useProfessionals } from "@hooks/useProfessionals.ts";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

function App() {
  const [inputValue, setInputValue] = useState<string>("");
  const { generateQuery, isGenerating } = useGenerateQuery();
  const { data, executeSql, loading } = useProfessionals(supabase);

  async function handleSubmit() {
    if (!inputValue.trim()) {
      toast.error("Debes ingresar una consulta");
      return;
    }

    try {
      const query = await generateQuery(inputValue);

      if (query) {
        const formattedQuery = query.endsWith(";") ? query.slice(0, -1) : query;
        await executeSql(formattedQuery);
      }
    } catch (error) {
      toast.error("Error generando la consulta");
      console.error("Error generando la consulta:", error);
    }
  }

  return (
    <>
      <main className="flex h-full p-8 items-center justify-center">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="font-bold text-2xl">
              Consulta la Base de Datos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <Search
              input={inputValue}
              isLoading={isGenerating || loading}
              setInput={setInputValue}
              submit={handleSubmit}
            />
            <DataTable data={data} isLoading={isGenerating || loading} />
          </CardContent>
        </Card>
      </main>
      <Toaster position="top-right" richColors theme="light" />
    </>
  );
}

export default App;
