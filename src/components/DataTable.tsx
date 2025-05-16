import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { useEffect, useState } from "react";
import type { ICounter } from "../types/counter.type";
import type { IProfessional } from "../types/professional.type";
import type { IResult } from "../types/result.type";

interface DataTableProps {
  data: IResult | null;
}

export function DataTable({ data }: DataTableProps) {
  const [dataType, setDataType] = useState<string | undefined>(undefined);

  useEffect(() => {
    const isProfessionalData =
      data && data.length > 0 && "firstname" in data[0];
    setDataType(isProfessionalData ? "table" : "counter");
  }, [data]);

  if (!data || data === null) return;

  if (Array.isArray(data) && data.length === 0)
    return (
      <p className="w-fit mx-auto px-2.5 py-2 rounded-md font-semibold bg-amber-200 text-amber-600">
        No hay resultados
      </p>
    );

  return (
    <main>
      <Table>
        <TableHeader className="bg-gray-200">
          {data && dataType === "table" ? (
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Apellido</TableHead>
              <TableHead>Especialización</TableHead>
              <TableHead>Disponible</TableHead>
            </TableRow>
          ) : (
            <TableRow>
              <TableHead>Cantidad</TableHead>
            </TableRow>
          )}
        </TableHeader>
        <TableBody>
          {data && dataType === "table"
            ? (data as IProfessional[]).map((item: IProfessional) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.firstname}</TableCell>
                    <TableCell>{item.lastname}</TableCell>
                    <TableCell>{item.specialization}</TableCell>
                    <TableCell>{item.available ? "Sí" : "No"}</TableCell>
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
