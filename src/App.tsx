import { DataTable } from "@components/DataTable";
import { Search } from "@components/Search";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Toaster } from "@components/ui/sonner";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import { toast } from "sonner";
import { generateQuery } from "./actions/ai";
import type { IResult } from "./types/result.type.ts";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

function App() {
  const [inputValue, setInputValue] = useState<string>("");
  const [sqlData, setSqlData] = useState<IResult | null>(null);

  async function getProfessionals(query?: string): Promise<void> {
    const { data, error } = await supabase.rpc("execute_sql", {
      query_text: query,
    });

    if (error) console.log(error);
    console.log(data);

    setSqlData(data);
  }

  async function handleSubmit() {
    try {
      throw new Error();
      const query = await generateQuery(inputValue);
      console.log(query);
      await getProfessionals(query.slice(0, -1));
    } catch (error) {
      toast.error("Error generando query");
      console.error("Error generating query:", error);
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
              setInput={setInputValue}
              submit={handleSubmit}
            />
            <DataTable data={sqlData} />
          </CardContent>
        </Card>
      </main>
      <Toaster position="top-right" richColors theme="light" />
    </>
  );
}

export default App;
