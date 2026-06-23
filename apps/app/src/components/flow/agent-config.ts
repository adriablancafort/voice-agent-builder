import type {
  AgentConfig,
  FlowEdgeConfig,
  FlowNodeConfig,
} from "@workspace/shared/api/agent-config/types"

export type ClientFlowNode = FlowNodeConfig & { selected?: boolean }
export type ClientFlowEdge = FlowEdgeConfig & { selected?: boolean }

export type ClientConfig = Omit<AgentConfig, "nodes" | "edges"> & {
  nodes: ClientFlowNode[]
  edges: ClientFlowEdge[]
}

export function toClientConfig(server: AgentConfig): ClientConfig {
  return {
    ...server,
    nodes: server.nodes.map((node) => ({ ...node, selected: false })),
    edges: server.edges.map((edge) => ({ ...edge, selected: false })),
  }
}

export function toServerConfig(config: ClientConfig): AgentConfig {
  return {
    ...config,
    nodes: config.nodes.map(({ selected: _, ...node }) => node),
    edges: config.edges.map(({ selected: _, ...edge }) => edge),
  }
}

export function applySelection(
  config: ClientConfig,
  selected?: { nodeId?: string; edgeId?: string }
): ClientConfig {
  return {
    ...config,
    nodes: config.nodes.map((node) => ({
      ...node,
      selected: node.id === selected?.nodeId,
    })),
    edges: config.edges.map((edge) => ({
      ...edge,
      selected: edge.id === selected?.edgeId,
    })),
  }
}
