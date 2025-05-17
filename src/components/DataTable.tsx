import { Spinner } from "@assets/icons/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { cn } from "@lib/utils";
import { useEffect, useState } from "react";
import type { ICounter } from "../types/counter.type";
import type { IProfessional } from "../types/professional.type";
import type { IResult } from "../types/result.type";

interface DataTableProps {
  data: IResult | null;
  isLoading: boolean;
}

export function DataTable({ data, isLoading }: DataTableProps) {
  const [dataType, setDataType] = useState<string | undefined>(undefined);

  useEffect(() => {
    const isProfessionalData =
      data && data.length > 0 && "specialization" in data[0];
    setDataType(isProfessionalData ? "table" : "counter");
  }, [data]);

  if (!data) return;

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <div className="flex items-center gap-3 px-3 py-2 rounded-md bg-zinc-200 text-zinc-600 text-sm font-medium border border-zinc-300/50 shadow-xs">
          <Spinner />
          <span>Generando consulta</span>
        </div>
      </div>
    );
  }

  if (data && data.length === 0) {
    return (
      <div className="flex justify-center">
        <p className="px-3 py-2 rounded-md bg-amber-200 text-amber-600 text-sm font-medium border border-amber-300/50 shadow-xs">
          No hay resultados
        </p>
      </div>
    );
  }

  return (
    <main>
      <Table>
        <TableHeader className="bg-gray-200">
          {data && dataType === "table" ? (
            "firstname" in data[0] ? (
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Apellido</TableHead>
                <TableHead>Especialización</TableHead>
                <TableHead>Disponible</TableHead>
              </TableRow>
            ) : (
              <TableRow>
                <TableHead>Especialización</TableHead>
              </TableRow>
            )
          ) : (
            <TableRow>
              <TableHead>Cantidad</TableHead>
            </TableRow>
          )}
        </TableHeader>
        <TableBody>
          {data && dataType === "table"
            ? (data as IProfessional[]).map((item: IProfessional) => {
                return "firstname" in data[0] ? (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.firstname}</TableCell>
                    <TableCell>{item.lastname}</TableCell>
                    <TableCell>{item.specialization}</TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          "flex p-1 rounded-md justify-center font-medium text-xs w-[50px]",
                          item.available
                            ? "bg-emerald-200 text-emerald-600"
                            : "bg-rose-200 text-rose-600",
                        )}
                      >
                        {item.available ? "Sí" : "No"}
                      </span>
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow>
                    <TableCell>{item.specialization}</TableCell>
                  </TableRow>
                );
              })
            : (data as ICounter[]).map((item: ICounter) => {
                return (
                  <TableRow key={crypto.randomUUID()}>
                    <TableCell>{item.count}</TableCell>
                  </TableRow>
                );
              })}
        </TableBody>
      </Table>
    </main>
  );
}
