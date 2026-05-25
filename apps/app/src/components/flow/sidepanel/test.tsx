import { VoiceAgentClient } from "@/components/voice-agent-client"

type TestPanelProps = {
  agentId: string
}

export function TestPanel({ agentId }: TestPanelProps) {
  return (
    <div className="flex h-full items-center justify-center">
      <VoiceAgentClient agentId={agentId} />
    </div>
  )
}
