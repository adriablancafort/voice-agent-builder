import { PencilLineIcon } from "lucide-react"
import * as React from "react"

type InlineEditableFieldProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function InlineEditableField({
  value,
  onChange,
  placeholder = "Click to edit",
}: InlineEditableFieldProps) {
  const [editing, setEditing] = React.useState(false)
  const [draft, setDraft] = React.useState(value)

  React.useEffect(() => {
    setDraft(value)
  }, [value])

  function save() {
    onChange(draft)
    setEditing(false)
  }

  if (editing) {
    return (
      <input
        autoFocus
        value={draft}
        className="min-w-sm bg-transparent p-0 text-inherit focus:outline-none"
        onChange={(event) => setDraft(event.target.value)}
        onBlur={save}
        onKeyDown={(event) => {
          if (event.key === "Enter") save()
          if (event.key === "Escape") {
            setDraft(value)
            setEditing(false)
          }
        }}
      />
    )
  }

  return (
    <button
      className="inline-flex max-w-xs items-center gap-2 bg-transparent p-0 text-inherit"
      onClick={() => setEditing(true)}
    >
      <span className="truncate">{value || placeholder}</span>
      <PencilLineIcon className="h-3.5 w-3.5 shrink-0" />
    </button>
  )
}
