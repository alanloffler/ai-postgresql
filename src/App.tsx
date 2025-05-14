import { Button } from "@components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Input } from "@components/ui/input";
import { useState } from "react";
import type { IProfessional } from "./interfaces/professional.interface";
import { createClient } from "@supabase/supabase-js";
import { generateQuery } from "./actions/ai";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

function App() {
  const [inputValue, setInputValue] = useState<string>("");
  const [professionals, setProfessionals] = useState<IProfessional[] | null>(
    null,
  );

  async function getProfessionals(query: string): Promise<void> {
    const { data, error } = await supabase.rpc("execute_sql", {
      query_text: query,
    });

    if (error) console.log(error);
    console.log(data);
    setProfessionals(data);
  }

  async function handleSubmit() {
    console.log(inputValue);
    const query = await generateQuery(inputValue);
    console.log(query);
    await getProfessionals(query.slice(0, -1));
  }

  return (
    <main className="flex h-full p-8 items-center justify-center">
      <Card className="w-2xl">
        <CardHeader>
          <CardTitle className="font-bold text-2xl">
            Consulta la Base de Datos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <section className="flex gap-6">
              <Input
                type="text"
                placeholder="Ingresa tu consulta"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Button type="submit" variant="default">
                Buscar
              </Button>
            </section>
          </form>
          <section>{JSON.stringify(professionals)}</section>
        </CardContent>
      </Card>
    </main>
  );
}

export default App;
