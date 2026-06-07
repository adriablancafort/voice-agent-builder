import type { z } from "zod"

import type {
  createPhoneNumberInputSchema,
  updatePhoneNumberInputSchema,
} from "./schemas"

export type PhoneNumber = {
  id: string
  number: string
  agentId: string | null
  agentVersionId: string | null
  createdAt: Date
  updatedAt: Date
}

export type PhoneNumberListItem = PhoneNumber & {
  agent: { name: string } | null
  agentVersion: { number: number } | null
}

export type CreatePhoneNumberInput = z.infer<
  typeof createPhoneNumberInputSchema
>
export type UpdatePhoneNumberInput = z.infer<
  typeof updatePhoneNumberInputSchema
>
