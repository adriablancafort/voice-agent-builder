import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useState } from "react"

import type { CallListItem } from "@workspace/shared/calls/types"
import { Badge } from "@workspace/ui/components/badge"
import { Input } from "@workspace/ui/components/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"

const dateFormatter = new Intl.DateTimeFormat("en", {
  dateStyle: "medium",
  timeStyle: "short",
})

const secondsFormatter = new Intl.NumberFormat("en", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const columns: ColumnDef<CallListItem>[] = [
  {
    accessorKey: "startedAt",
    header: "Started",
    cell: ({ row }) => dateFormatter.format(new Date(row.original.startedAt)),
  },
  {
    id: "duration",
    header: "Duration",
    cell: ({ row }) =>
      row.original.durationMs === null
        ? null
        : `${secondsFormatter.format(row.original.durationMs / 1000)}s`,
  },
  {
    accessorKey: "channel",
    header: "Channel",
    cell: ({ row }) => (row.original.channel === "web_call" ? "Web" : "Phone"),
  },
  {
    id: "from",
    header: "From",
    cell: ({ row }) => row.original.fromNumber,
  },
  {
    id: "to",
    header: "To",
    cell: ({ row }) => row.original.toNumber,
  },
  {
    id: "agent",
    header: "Agent",
    accessorFn: (row) => row.agent?.name ?? "",
    cell: ({ row }) => row.original.agent?.name,
  },
  {
    id: "version",
    header: "Version",
    cell: ({ row }) =>
      row.original.agentVersion
        ? `V${row.original.agentVersion.number}`
        : "Latest",
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant={row.original.status === "ongoing" ? "outline" : "secondary"}
      >
        {row.original.status}
      </Badge>
    ),
  },
]

export function CallsDataTable({ data }: { data: CallListItem[] }) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  })

  return (
    <div>
      <Input
        value={(table.getColumn("agent")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("agent")?.setFilterValue(event.target.value)
        }
        placeholder="Search agents..."
        className="mb-5 max-w-xs"
      />
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
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
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  No results
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
