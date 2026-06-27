import { z } from "zod"

export const phoneNumberIdParamsSchema = z.object({
  id: z.uuid(),
})

export const createPhoneNumberRequestSchema = z
  .object({
    number: z.e164(),
    sipAddress: z.string().trim().min(1).nullable().optional(),
    sipUsername: z.string().trim().min(1).nullable().optional(),
    sipPassword: z.string().trim().min(1).nullable().optional(),
    agentId: z.uuid().nullable().optional(),
    agentVersionId: z.uuid().nullable().optional(),
  })
  .refine((data) => !data.agentVersionId || data.agentId, {
    message: "Agent is required when a version is selected",
    path: ["agentId"],
  })
  .refine((data) => !data.sipUsername || !!data.sipPassword, {
    message: "SIP password is required when a username is set",
    path: ["sipPassword"],
  })

export const updatePhoneNumberRequestSchema = z
  .object({
    number: z.e164().optional(),
    sipAddress: z.string().trim().min(1).nullable().optional(),
    sipUsername: z.string().trim().min(1).nullable().optional(),
    sipPassword: z.string().trim().min(1).nullable().optional(),
    agentId: z.uuid().nullable().optional(),
    agentVersionId: z.uuid().nullable().optional(),
  })
  .refine((data) => !data.agentVersionId || !!data.agentId, {
    message: "Agent is required when a version is selected",
    path: ["agentId"],
  })
  .refine((data) => !data.sipUsername || !!data.sipPassword, {
    message: "SIP password is required when a username is set",
    path: ["sipPassword"],
  })
