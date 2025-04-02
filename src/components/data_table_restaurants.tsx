"use client"

import * as React from "react"
import { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Trash } from "lucide-react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DialogCreateRestaurant } from "./create_restaurant_component"
import { RestaurantData } from "@/constants/restaurants"
import { deleteRestaurant, fetchRestaurants } from "@/utils/requests"
import { useRouter } from "next/navigation";

export function DataTableRestaurants() {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [data, setData] = React.useState<RestaurantData[]>([])
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [search, setSearch] = React.useState("")
  const router = useRouter();
  const fetchData = async () => {
    try {
      const fetchedData: RestaurantData[] | undefined | null = await fetchRestaurants();
      if (fetchedData) {
        setData(fetchedData);
      } else {
        setData([]);
        router.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  React.useEffect(() => {
    fetchData();
  }, [router]);

  const handleDelete = async (id: string) => {
    setLoadingId(id);
    try {
      const res: Response | undefined = await deleteRestaurant(id);
      if (res?.ok) {
        const fetchedData: RestaurantData[] | undefined | null = await fetchRestaurants();
        setData(fetchedData || []);
      }
    } catch (err) {
      console.log("Error al eliminar restaurante", err);
    }
    setLoadingId(null);
  };

  const columns: ColumnDef<RestaurantData>[] = [
    { accessorKey: "id", header: "Id" },
    { accessorKey: "name", header: "Restaurante" },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => (
        <Button size="sm" onClick={() => handleDelete(row.getValue("id"))} disabled={loadingId === row.getValue("id")}>
          {loadingId === row.getValue("id") ? <Loader2 className="animate-spin" /> : <Trash size={16} />}
        </Button>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  React.useEffect(() => {
    table.getColumn("name")?.setFilterValue(search);
  }, [search, table]);

  return (
    <div className="w-full">
      <div className="mb-4 flex flex-row justify-between items-center gap-2">
        <Input
          placeholder="Buscar por nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-sm"
        />
        <DialogCreateRestaurant onClose={fetchData}/>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell ? cell.column.columnDef.cell : () => cell.getValue(),
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  <div className="w-full flex flex-row justify-center">
                    Cargando resultados
                    <Loader2 className="animate-spin" />
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
