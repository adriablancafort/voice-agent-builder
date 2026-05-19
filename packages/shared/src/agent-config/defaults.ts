import type { AgentConfig } from "./types"

export function createDefaultAgentConfig(): AgentConfig {
  return {
    globalPrompt: "You are a helpful assistant",
    nodes: [
      {
        id: "conversation",
        type: "conversation",
        position: { x: 0, y: 0 },
        data: {
          name: "Greeting",
          isStart: true,
          startSpeaker: "agent",
          instructions: {
            type: "prompt",
            text: "Greet the user and ask how you can help",
          },
        },
      },
      {
        id: "end",
        type: "end",
        position: { x: 0, y: 250 },
        data: {
          name: "End Call",
        },
      },
    ],
    edges: [
      {
        id: "edge",
        source: "conversation",
        target: "end",
        data: {
          condition: "Conversation completed",
        },
      },
    ],
  }
}
