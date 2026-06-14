import type { FlowNodeConfig } from "@workspace/shared/agent-config/types"

export const SIDE_PANEL_OFFSET_PX = 250
export const FOCUS_ZOOM = 0.9
const FLOW_NODE_GAP = 200

export function getNextNodePosition(nodes: FlowNodeConfig[]) {
  if (nodes.length === 0) {
    return { x: 100, y: 100 }
  }

  const bottomY = Math.max(...nodes.map((node) => node.position.y))
  const centerX =
    nodes.reduce((sum, node) => sum + node.position.x, 0) / nodes.length

  return { x: centerX, y: bottomY + FLOW_NODE_GAP }
}
