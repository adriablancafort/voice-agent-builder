import { VariableValuesFields } from "@/components/variable-values-fields"
import { VoiceAgentClient } from "@/components/voice-agent-client"
import { VoiceAgentTranscript } from "@/components/voice-agent-transcript"
import { useVariableValues } from "@/hooks/use-variable-values"
import { useAgentStore } from "@/stores/agent"
import { FlowSidePanelBase } from "./base"

export function TestPanel() {
  const agent = useAgentStore((state) => state.agent)
  const config = useAgentStore((state) => state.config)
  const activeVersionId = useAgentStore((state) => state.activeVersionId)
  const variables = useVariableValues(config)

  return (
    <FlowSidePanelBase title="Test agent" contentClassName="p-0">
      <VoiceAgentClient
        agentId={agent.id}
        agentVersionId={activeVersionId ?? undefined}
        variableValues={variables.values}
        preCallContent={
          <VariableValuesFields className="mb-4" variables={variables} />
        }
      >
        <VoiceAgentTranscript />
      </VoiceAgentClient>
    </FlowSidePanelBase>
  )
}
