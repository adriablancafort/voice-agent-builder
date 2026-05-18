import { zValidator } from "@hono/zod-validator"
import { eq } from "drizzle-orm"
import { Hono } from "hono"
import { db } from "@workspace/db/client"
import { agentsTable, agentVersionsTable } from "@workspace/db/db/schema"
import {
  agentIdParamsSchema,
  agentVersionParamsSchema,
  createAgentInputSchema,
  publishAgentInputSchema,
  updateAgentInputSchema,
} from "@workspace/shared/agents/schemas"
import type {
  AgentDetail,
  AgentDraft,
  AgentListItem,
  AgentVersionDetail,
  AgentVersionSummary,
} from "@workspace/shared/agents/types"

export const agentRoutes = new Hono()

agentRoutes.get("/", async (c) => {
  try {
    const agents = await db.query.agentsTable.findMany({
      columns: {
        draftConfig: false,
      },
      orderBy: {
        updatedAt: "desc",
      },
    })

    return c.json(agents satisfies AgentListItem[])
  } catch {
    return c.json({ error: "Failed to load agents" }, 500)
  }
})

agentRoutes.post("/", zValidator("json", createAgentInputSchema), async (c) => {
  try {
    const payload = c.req.valid("json")

    const [agent] = await db
      .insert(agentsTable)
      .values({
        id: crypto.randomUUID(),
        name: payload.name,
        draftConfig: payload.draftConfig,
      })
      .returning()

    return c.json(agent satisfies AgentDraft, 201)
  } catch {
    return c.json({ error: "Failed to create agent" }, 500)
  }
})

agentRoutes.get("/:id", zValidator("param", agentIdParamsSchema), async (c) => {
  const { id: agentId } = c.req.valid("param")

  try {
    const agent = await db.query.agentsTable.findFirst({
      where: {
        id: agentId,
      },
      with: {
        versions: {
          columns: {
            agentId: false,
            config: false,
          },
          orderBy: {
            number: "desc",
          },
        },
      },
    })

    if (!agent) {
      return c.json({ error: "Agent not found" }, 404)
    }

    return c.json(agent satisfies AgentDetail)
  } catch {
    return c.json({ error: "Failed to load agent" }, 500)
  }
})

agentRoutes.patch(
  "/:id",
  zValidator("param", agentIdParamsSchema),
  zValidator("json", updateAgentInputSchema),
  async (c) => {
    const { id: agentId } = c.req.valid("param")

    try {
      const payload = c.req.valid("json")

      const [agent] = await db
        .update(agentsTable)
        .set({
          updatedAt: new Date(),
          name: payload.name,
          draftConfig: payload.draftConfig,
        })
        .where(eq(agentsTable.id, agentId))
        .returning()

      if (!agent) {
        return c.json({ error: "Agent not found" }, 404)
      }

      return c.json(agent satisfies AgentDraft)
    } catch {
      return c.json({ error: "Failed to update agent" }, 500)
    }
  }
)

agentRoutes.get(
  "/:id/versions/:number",
  zValidator("param", agentVersionParamsSchema),
  async (c) => {
    const { id: agentId, number: versionNumber } = c.req.valid("param")

    try {
      const version = await db.query.agentVersionsTable.findFirst({
        columns: {
          agentId: false,
        },
        where: {
          agentId,
          number: versionNumber,
        },
      })

      if (!version) {
        return c.json({ error: "Agent version not found" }, 404)
      }

      return c.json(version satisfies AgentVersionDetail)
    } catch {
      return c.json({ error: "Failed to load agent version" }, 500)
    }
  }
)

agentRoutes.post(
  "/:id/publish",
  zValidator("param", agentIdParamsSchema),
  zValidator("json", publishAgentInputSchema),
  async (c) => {
    const { id: agentId } = c.req.valid("param")

    try {
      const payload = c.req.valid("json")

      const publishedVersion = await db.transaction(async (tx) => {
        const agent = await tx.query.agentsTable.findFirst({
          where: {
            id: agentId,
          },
        })

        if (!agent) {
          return null
        }

        const latestVersion = await tx.query.agentVersionsTable.findFirst({
          where: {
            agentId,
          },
          columns: {
            number: true,
          },
          orderBy: {
            number: "desc",
          },
        })

        const nextNumber = (latestVersion?.number ?? 0) + 1

        const [version] = await tx
          .insert(agentVersionsTable)
          .values({
            id: crypto.randomUUID(),
            agentId,
            number: nextNumber,
            name: payload.name,
            description: payload.description,
            config: agent.draftConfig,
          })
          .returning({
            id: agentVersionsTable.id,
            number: agentVersionsTable.number,
            name: agentVersionsTable.name,
            description: agentVersionsTable.description,
            publishedAt: agentVersionsTable.publishedAt,
            createdAt: agentVersionsTable.createdAt,
          })

        return version
      })

      if (!publishedVersion) {
        return c.json({ error: "Agent not found" }, 404)
      }

      return c.json(publishedVersion satisfies AgentVersionSummary, 201)
    } catch {
      return c.json({ error: "Failed to publish agent version" }, 500)
    }
  }
)
