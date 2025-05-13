import { Button } from "@components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Input } from "@components/ui/input";

function App() {
  return (
    <main className="flex h-full p-8 items-center justify-center">
      <Card className="w-2xl">
        <CardHeader>
          <CardTitle className="font-bold text-2xl">
            Consulta la Base de Datos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="">
            <section className="flex gap-6">
              <Input placeholder="Ingresa tu consulta" />
              <Button variant="default">Buscar</Button>
            </section>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}

export default App;
