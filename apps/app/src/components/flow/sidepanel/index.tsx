import { type FlowSidePanelState, useAgentStore } from "@/stores/agent"
import { EdgePanel } from "./edges/condition"
import { GlobalPromptPanel } from "./global-prompt"
import { ModelsConfigPanel } from "./models-config"
import { NodePanel } from "./nodes"
import { TestPanel } from "./test"

const closedPanel: FlowSidePanelState = { kind: "closed" }

export function FlowSidePanel() {
  const panel = useAgentStore((state) => {
    const { sidePanel, draftConfig } = state

    if (
      sidePanel.kind === "node" &&
      !draftConfig.nodes.some((node) => node.id === sidePanel.nodeId)
    ) {
      return closedPanel
    }

    if (
      sidePanel.kind === "edge" &&
      !draftConfig.edges.some((edge) => edge.id === sidePanel.edgeId)
    ) {
      return closedPanel
    }

    return sidePanel
  })

  switch (panel.kind) {
    case "closed":
      return null
    case "test":
      return <TestPanel />
    case "global-prompt":
      return <GlobalPromptPanel />
    case "models-config":
      return <ModelsConfigPanel />
    case "node":
      return <NodePanel key={panel.nodeId} nodeId={panel.nodeId} />
    case "edge":
      return <EdgePanel key={panel.edgeId} edgeId={panel.edgeId} />
  }
}
