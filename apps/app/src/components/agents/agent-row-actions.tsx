import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CopyIcon, MoreHorizontalIcon, Trash2Icon } from "lucide-react"
import type {
  AgentListItem,
  DeleteAgentResponse,
  DuplicateAgentResponse,
} from "@workspace/shared/agents/types"
import { Button } from "@workspace/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { toast } from "@workspace/ui/components/sonner"
import { api } from "@/lib/api"

export function AgentRowActions({ agent }: { agent: AgentListItem }) {
  const queryClient = useQueryClient()

  const duplicateMutation = useMutation({
    mutationFn: () =>
      api.post<DuplicateAgentResponse, never>(
        `/agents/${agent.id}/duplicate`,
        {}
      ),
    onSuccess: () => {
      toast.success("Agent duplicated")
      queryClient.invalidateQueries({ queryKey: ["agents"] })
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: () => api.delete<DeleteAgentResponse>(`/agents/${agent.id}`),
    onSuccess: () => {
      toast.success(`${agent.name} deleted`)
      queryClient.invalidateQueries({ queryKey: ["agents"] })
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label={`Open actions for ${agent.name}`}
          onClick={(event) => event.stopPropagation()}
        >
          <MoreHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={4}>
        <DropdownMenuItem
          disabled={duplicateMutation.isPending}
          onClick={() => duplicateMutation.mutate()}
        >
          <CopyIcon />
          Duplicate
        </DropdownMenuItem>
        <DropdownMenuItem
          variant="destructive"
          disabled={deleteMutation.isPending}
          onClick={() => deleteMutation.mutate()}
        >
          <Trash2Icon />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
