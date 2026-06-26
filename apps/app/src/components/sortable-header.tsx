import type { Column } from "@tanstack/react-table"
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react"

export function SortableHeader<TData>({
  column,
  title,
}: {
  column: Column<TData>
  title: string
}) {
  const sorted = column.getIsSorted()

  return (
    <button
      type="button"
      className="flex cursor-pointer items-center gap-2 select-none"
      onClick={() => column.toggleSorting(sorted === "asc")}
    >
      {title}
      {sorted === "asc" ? (
        <ArrowUp className="size-4" />
      ) : sorted === "desc" ? (
        <ArrowDown className="size-4" />
      ) : (
        <ChevronsUpDown className="size-4" />
      )}
    </button>
  )
}
