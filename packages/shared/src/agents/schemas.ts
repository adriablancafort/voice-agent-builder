import { z } from "zod"
import { agentConfigSchema } from "../agent-config/schemas"

export const agentIdParamsSchema = z.object({
  id: z.uuid(),
})

export const agentVersionParamsSchema = z.object({
  id: z.uuid(),
  number: z.coerce.number().int().positive(),
})

export const createAgentInputSchema = z.object({
  name: z.string().trim().min(1),
  draftConfig: agentConfigSchema,
})

export const updateAgentInputSchema = z.object({
  name: z.string().trim().min(1),
  draftConfig: agentConfigSchema,
})

export const publishAgentInputSchema = z.object({
  name: z.string().trim().min(1).optional(),
  description: z.string().trim().min(1).optional(),
})
