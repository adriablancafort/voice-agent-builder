import type { AgentConfig } from "@workspace/shared/agent-config/types"
import type { AgentConfigInput } from "@workspace/shared/agents/types"
import { api } from "@/lib/api"

export function loadAgentConfig(payload: AgentConfigInput) {
  return api.post<AgentConfig, AgentConfigInput>("/agents/config", {
    body: payload,
  })
}
