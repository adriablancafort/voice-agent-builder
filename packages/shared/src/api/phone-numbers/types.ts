import type { z } from "zod"

import type {
  createPhoneNumberRequestSchema,
  updatePhoneNumberRequestSchema,
} from "./schemas"

export type CreatePhoneNumberRequest = z.infer<
  typeof createPhoneNumberRequestSchema
>
export type UpdatePhoneNumberRequest = z.infer<
  typeof updatePhoneNumberRequestSchema
>

export type PhoneNumberResponse = {
  id: string
  number: string
  sipAddress: string | null
  sipUsername: string | null
  sipPassword: string | null
  agentId: string | null
  agentVersionId: string | null
  createdAt: Date
  updatedAt: Date
}

export type PhoneNumberListResponse = (PhoneNumberResponse & {
  agent: { name: string } | null
  agentVersion: { number: number } | null
})[]
