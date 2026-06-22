import type { z } from "zod"

import type { AgentConfig } from "../agent-config/types"
import type {
  completeCallInputSchema,
  startPhoneCallInputSchema,
  startWebCallInputSchema,
} from "./schemas"

export type CallChannel = "web_call" | "phone_call"

export type StartWebCallInput = z.infer<typeof startWebCallInputSchema>
export type StartPhoneCallInput = z.infer<typeof startPhoneCallInputSchema>
export type CompleteCallInput = z.infer<typeof completeCallInputSchema>

export type StartCallResponse = {
  callId: string
  config: AgentConfig
}

export type CompleteCallResponse = {
  id: string
  durationMs: number
}

export type CallListItem = {
  id: string
  organizationId: string
  agentId: string
  agentVersionId: string | null
  channel: CallChannel
  fromNumber: string | null
  toNumber: string | null
  sttModel: string
  llmModel: string
  ttsModel: string
  livekitRoomName: string
  startedAt: Date
  endedAt: Date | null
  durationMs: number | null
  sttCost: string | null
  llmCost: string | null
  ttsCost: string | null
  telephonyCost: string | null
  platformCost: string | null
  totalCost: string | null
  createdAt: Date
  updatedAt: Date
  agent: { name: string } | null
  agentVersion: { number: number } | null
}
