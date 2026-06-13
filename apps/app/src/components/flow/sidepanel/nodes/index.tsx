import { useAgentStore } from "@/stores/agent"
import { ConversationNodePanel } from "./conversation"
import { EndNodePanel } from "./end"

type NodePanelProps = {
  nodeId: string
}

export function NodePanel({ nodeId }: NodePanelProps) {
  const node = useAgentStore((state) =>
    state.draftConfig.nodes.find((entry) => entry.id === nodeId)
  )

  if (!node) {
    return null
  }

  switch (node.type) {
    case "conversation":
      return <ConversationNodePanel node={node} />
    case "end":
      return <EndNodePanel node={node} />
  }
}
