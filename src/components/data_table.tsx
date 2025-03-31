"use client"

import * as React from "react"
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
import { DialogCreateUser } from "./create_user_component"
import { UserData } from "@/constants/user"
import { fetchUsers, deleteUser } from "@/utils/requests"


export function DataTable() {
  
  const [data, setData] = React.useState<UserData[]>([])
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [search, setSearch] = React.useState("")
   

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUsers: UserData[] | undefined = await fetchUsers();

        if (fetchedUsers) {
          setData(fetchedUsers); // Guarda los usuarios en el estado
        } else {
          setData([]);
        }
      } catch (err) {
        console.log(err)
        //setError('Error fetching users');
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteUser(id);
      if (res["mensaje"] === "ok") {
        // Si la eliminación fue exitosa, recargar los usuarios
        const fetchedUsers: UserData[] | undefined = await fetchUsers();
        if (fetchedUsers) {
          setData(fetchedUsers); // Actualiza la lista de usuarios
        }
      }
    } catch (err) {
      console.log("Error al eliminar usuario", err);
    }


  }

  const columns: ColumnDef<UserData>[] = [
    { accessorKey: "first_name", header: "Nombre" },
    { accessorKey: "last_name", header: "Apellido" },
    { accessorKey: "role", header: "Rol" },
    { accessorKey: "id", header: "Correo" },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => (
        <Button size="sm" onClick={() => handleDelete(row.getValue("id"))}>
          <Trash size={16} />
        </Button>
      ),
    },
  ]

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
  })

  React.useEffect(() => {
    table.getColumn("first_name")?.setFilterValue(search)
    

  }, [search, table])

  return (
    <div className="w-full">
      <div className="mb-4 flex flex-row justify-between items-center gap-2">
        <Input
          placeholder="Buscar por nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-sm"
        />
        <DialogCreateUser/>
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
