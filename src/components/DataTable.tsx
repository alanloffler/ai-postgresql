import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import type { IProfessional } from "@interfaces/professional.interface";

interface DataTableProps {
  data: IProfessional[] | null;
}

export function DataTable({ data }: DataTableProps) {
  if (!data || data === null) return;

  if (data.length === 0)
    return (
      <p className="w-fit mx-auto px-2.5 py-2 rounded-md font-semibold bg-amber-200 text-amber-600">
        No hay resultados
      </p>
    );

  return (
    <main>
      <Table>
        <TableHeader className="bg-gray-200">
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Apellido</TableHead>
            <TableHead>Especialización</TableHead>
            <TableHead>Disponible</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.firstname}</TableCell>
              <TableCell>{item.lastname}</TableCell>
              <TableCell>{item.specialization}</TableCell>
              <TableCell>{item.available ? "Sí" : "No"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
