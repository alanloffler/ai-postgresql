import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import type { Dispatch, SetStateAction } from "react";

interface SearchProps {
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  submit: () => void;
}

export function Search({ input, setInput, submit }: SearchProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <section className="flex gap-6">
        <Input
          type="text"
          placeholder="Ingresa tu consulta"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button type="submit" variant="default">
          Buscar
        </Button>
      </section>
    </form>
  );
}
