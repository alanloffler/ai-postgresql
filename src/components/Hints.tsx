import { type Dispatch, type SetStateAction } from "react";

interface HintsProps {
  setInputValue: Dispatch<SetStateAction<string>>;
}

export function Hints({ setInputValue }: HintsProps) {
  const hints = [
    { text: "Lista de todos los profesionales" },
    { text: "Profesionales cardiólogos" },
    { text: "Cantidad de psicopedagógas" },
  ];

  return (
    <section className="grid grid-cols-2 sm:flex gap-3">
      {hints.map((hint, index) => (
        <button
          className="w-fit px-2 py-1 rounded-md bg-zinc-100 text-muted-foreground text-xs"
          key={index}
          onClick={() => setInputValue(hint.text)}
        >
          {hint.text}
        </button>
      ))}
    </section>
  );
}
