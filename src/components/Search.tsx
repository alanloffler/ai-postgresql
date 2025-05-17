import { Spinner } from "@assets/icons/spinner";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import type { Dispatch, KeyboardEvent, SetStateAction } from "react";

interface SearchProps {
  input: string;
  isLoading: boolean;
  setInput: Dispatch<SetStateAction<string>>;
  submit: () => void;
}

export function Search({ input, setInput, submit, isLoading }: SearchProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !isLoading) {
      submit();
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <section className="flex items-center gap-6">
        <Input
          type="text"
          placeholder="Ingresa tu consulta"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button disabled={isLoading} type="submit">
          {isLoading ? (
            <div className="flex gap-2 items-center">
              <Spinner />
              <span>Buscando</span>
            </div>
          ) : (
            "Buscar"
          )}
        </Button>
      </section>
    </form>
  );
}
