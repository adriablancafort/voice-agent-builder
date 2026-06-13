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
  AgentConfig,
  FlowEdgeConfig,
  FlowNodeConfig,
} from "@workspace/shared/agent-config/types"
import type { AgentDetail } from "@workspace/shared/agents/types"

export type FlowSidePanelState =
  | { kind: "closed" }
  | { kind: "test" }
  | { kind: "global-prompt" }
  | { kind: "models-config" }
  | { kind: "node"; nodeId: string }
  | { kind: "edge"; edgeId: string }

type AgentStoreState = AgentDetail & {
  sidePanel: FlowSidePanelState
}

type AgentStore = AgentStoreState & {
  setName: (name: string) => void
  setConfig: (draftConfig: AgentConfig) => void
  setNode: (node: FlowNodeConfig) => void
  setEdge: (edge: FlowEdgeConfig) => void
  addNode: (node: FlowNodeConfig) => void
  onNodesChange: (changes: NodeChange<FlowNodeConfig>[]) => void
  onEdgesChange: (changes: EdgeChange<FlowEdgeConfig>[]) => void
  onConnect: (connection: Connection) => void
  selectNode: (nodeId: string) => void
  selectEdge: (edgeId: string) => void
  openSidePanel: (panel: FlowSidePanelState) => void
  closeSidePanel: () => void
}

const initialState: AgentStoreState = {
  id: "",
  name: "",
  draftConfig: createDefaultAgentConfig(),
  createdAt: new Date(),
  updatedAt: new Date(),
  versions: [],
  sidePanel: { kind: "closed" },
}

export const useAgentStore = create<AgentStore>((set, get) => ({
  ...initialState,
  setName: (name) => set({ name }),
  setConfig: (draftConfig) => set({ draftConfig }),
  setNode: (node) =>
    set((state) => ({
      draftConfig: {
        ...state.draftConfig,
        nodes: state.draftConfig.nodes.map((entry) =>
          entry.id === node.id ? node : entry
        ),
      },
    })),
  setEdge: (edge) =>
    set((state) => ({
      draftConfig: {
        ...state.draftConfig,
        edges: state.draftConfig.edges.map((entry) =>
          entry.id === edge.id ? edge : entry
        ),
      },
    })),
  addNode: (node) => {
    set((state) => ({
      draftConfig: {
        ...state.draftConfig,
        nodes: [...state.draftConfig.nodes, node],
      },
    }))
    get().openSidePanel({ kind: "node", nodeId: node.id })
  },
  onNodesChange: (changes) =>
    set((state) => ({
      draftConfig: {
        ...state.draftConfig,
        nodes: applyNodeChanges(changes, state.draftConfig.nodes),
      },
    })),
  onEdgesChange: (changes) =>
    set((state) => ({
      draftConfig: {
        ...state.draftConfig,
        edges: applyEdgeChanges(changes, state.draftConfig.edges),
      },
    })),
  onConnect: (connection) => {
    const edgeId = crypto.randomUUID()

    set((state) => ({
      draftConfig: {
        ...state.draftConfig,
        edges: addEdge(
          {
            ...connection,
            id: edgeId,
            data: { condition: "Transition condition" },
          },
          state.draftConfig.edges
        ),
      },
    }))
    queueMicrotask(() => get().openSidePanel({ kind: "edge", edgeId }))
  },
  selectNode: (nodeId) => get().openSidePanel({ kind: "node", nodeId }),
  selectEdge: (edgeId) => get().openSidePanel({ kind: "edge", edgeId }),
  openSidePanel: (panel) => set({ sidePanel: panel }),
  closeSidePanel: () => set({ sidePanel: { kind: "closed" } }),
}))
