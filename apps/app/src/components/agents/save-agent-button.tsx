import { useMutation, useQueryClient } from "@tanstack/react-query"
import { SaveIcon } from "lucide-react"

import type {
  AgentResponse,
  UpdateAgentRequest,
} from "@workspace/shared/api/agents/types"
import { Button } from "@workspace/ui/components/button"
import { toast } from "@workspace/ui/components/sonner"
import { toServerConfig } from "@/components/flow/agent-config"
import { api } from "@/lib/api"
import { useAgentStore } from "@/stores/agent"

export function SaveAgentButton() {
  const queryClient = useQueryClient()
  const id = useAgentStore((state) => state.id)
  const name = useAgentStore((state) => state.name)
  const config = useAgentStore((state) => state.config)

  const saveMutation = useMutation({
    mutationFn: () =>
      api.patch<AgentResponse, UpdateAgentRequest>(`/agents/${id}`, {
        body: { name, config: toServerConfig(config) },
      }),
    onSuccess: () => {
      toast.success("Agent saved")
      queryClient.invalidateQueries({ queryKey: ["agents", id] })
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  return (
    <Button
      variant="outline"
      disabled={saveMutation.isPending}
      onClick={() => saveMutation.mutate()}
    >
      <SaveIcon />
      Save
    </Button>
  )
}
