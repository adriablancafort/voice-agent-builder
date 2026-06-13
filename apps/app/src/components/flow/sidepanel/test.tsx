import { VoiceAgentClient } from "@/components/voice-agent-client"
import { useAgentStore } from "@/stores/agent"
import { FlowSidePanelBase } from "./base"

export function TestPanel() {
  const agentId = useAgentStore((state) => state.id)

  return (
    <FlowSidePanelBase title="Test agent">
      <div className="flex h-full items-center justify-center">
        <VoiceAgentClient agentId={agentId} />
      </div>
    </FlowSidePanelBase>
  )
}
