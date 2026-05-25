import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  type Connection,
  type EdgeChange,
  type NodeChange,
} from "@xyflow/react"
import { create } from "zustand"
import { createDefaultAgentConfig } from "@workspace/shared/agent-config/defaults"
import type {
  FlowEdgeConfig,
  FlowNodeConfig,
} from "@workspace/shared/agent-config/types"
import type { AgentDetail } from "@workspace/shared/agents/types"

export type FlowSidePanelState =
  | { kind: "closed" }
  | { kind: "test" }
  | { kind: "node"; nodeId: string }
  | { kind: "edge"; edgeId: string }

type AgentStore = AgentDetail & {
  sidePanel: FlowSidePanelState
  openTestPanel: () => void
  openNodePanel: (nodeId: string) => void
  openEdgePanel: (edgeId: string) => void
  closeSidePanel: () => void
  setName: (name: string) => void
  setAgent: (agent: AgentDetail) => void
  updateNode: (
    nodeId: string,
    updater: (node: FlowNodeConfig) => FlowNodeConfig
  ) => void
  updateEdge: (
    edgeId: string,
    updater: (edge: FlowEdgeConfig) => FlowEdgeConfig
  ) => void
  onNodesChange: (changes: NodeChange<FlowNodeConfig>[]) => void
  onEdgesChange: (changes: EdgeChange<FlowEdgeConfig>[]) => void
  onConnect: (connection: Connection) => void
  addNode: (node: FlowNodeConfig) => void
}

function resolveSidePanelState(
  sidePanel: FlowSidePanelState,
  nodes: FlowNodeConfig[],
  edges: FlowEdgeConfig[]
): FlowSidePanelState {
  if (sidePanel.kind === "node") {
    const hasNode = nodes.some((node) => node.id === sidePanel.nodeId)
    return hasNode ? sidePanel : { kind: "closed" }
  }

  if (sidePanel.kind === "edge") {
    const hasEdge = edges.some((edge) => edge.id === sidePanel.edgeId)
    return hasEdge ? sidePanel : { kind: "closed" }
  }

  return sidePanel
}

function createEdgeId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID()
  }

  return `edge-${Date.now()}`
}

const initialState: AgentDetail = {
  id: "",
  name: "",
  draftConfig: createDefaultAgentConfig(),
  createdAt: new Date(),
  updatedAt: new Date(),
  versions: [],
}

export const useAgentStore = create<AgentStore>((set) => ({
  ...initialState,
  sidePanel: { kind: "closed" },
  openTestPanel: () =>
    set({
      sidePanel: { kind: "test" },
    }),
  openNodePanel: (nodeId) =>
    set({
      sidePanel: { kind: "node", nodeId },
    }),
  openEdgePanel: (edgeId) =>
    set({
      sidePanel: { kind: "edge", edgeId },
    }),
  closeSidePanel: () =>
    set({
      sidePanel: { kind: "closed" },
    }),
  setName: (name) =>
    set({
      name,
    }),
  setAgent: (agent) =>
    set((state) => {
      const isSameAgent = state.id === agent.id

      return {
        id: agent.id,
        name: agent.name,
        createdAt: agent.createdAt,
        updatedAt: agent.updatedAt,
        versions: agent.versions,
        draftConfig: agent.draftConfig,
        sidePanel: isSameAgent
          ? resolveSidePanelState(
              state.sidePanel,
              agent.draftConfig.nodes,
              agent.draftConfig.edges
            )
          : { kind: "closed" },
      }
    }),
  updateNode: (nodeId, updater) =>
    set((state) => ({
      draftConfig: {
        ...state.draftConfig,
        nodes: state.draftConfig.nodes.map((node) =>
          node.id === nodeId ? updater(node) : node
        ),
      },
    })),
  updateEdge: (edgeId, updater) =>
    set((state) => ({
      draftConfig: {
        ...state.draftConfig,
        edges: state.draftConfig.edges.map((edge) =>
          edge.id === edgeId ? updater(edge) : edge
        ),
      },
    })),
  onNodesChange: (changes) =>
    set((state) => {
      const nodes = applyNodeChanges(changes, state.draftConfig.nodes)
      const draftConfig = {
        ...state.draftConfig,
        nodes,
      }

      return {
        draftConfig,
        sidePanel: resolveSidePanelState(
          state.sidePanel,
          draftConfig.nodes,
          draftConfig.edges
        ),
      }
    }),
  onEdgesChange: (changes) =>
    set((state) => {
      const edges = applyEdgeChanges(changes, state.draftConfig.edges)
      const draftConfig = {
        ...state.draftConfig,
        edges,
      }

      return {
        draftConfig,
        sidePanel: resolveSidePanelState(
          state.sidePanel,
          draftConfig.nodes,
          draftConfig.edges
        ),
      }
    }),
  onConnect: (connection) =>
    set((state) => {
      const edgeId = createEdgeId()
      const edges = addEdge(
        {
          ...connection,
          id: edgeId,
          data: {
            condition: "Transition condition",
          },
        },
        state.draftConfig.edges
      )

      return {
        draftConfig: {
          ...state.draftConfig,
          edges,
        },
        sidePanel: { kind: "edge", edgeId },
      }
    }),
  addNode: (node) =>
    set((state) => ({
      draftConfig: {
        ...state.draftConfig,
        nodes: [...state.draftConfig.nodes, node],
      },
      sidePanel: { kind: "node", nodeId: node.id },
    })),
}))
