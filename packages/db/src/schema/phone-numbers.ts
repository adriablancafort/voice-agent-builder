import {
  index,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
  varchar,
} from "drizzle-orm/pg-core"

import { agentsTable, agentVersionsTable } from "@workspace/db/schema/agents"
import { organization } from "@workspace/db/schema/auth"

export const phoneNumbersTable = pgTable(
  "phone_numbers",
  {
    id: uuid().primaryKey(),
    organizationId: text("organization_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),
    number: varchar({ length: 16 }).notNull(),
    sipAddress: varchar("sip_address", { length: 255 }),
    sipUsername: varchar("sip_username", { length: 255 }),
    sipPassword: varchar("sip_password", { length: 255 }),
    agentId: uuid("agent_id").references(() => agentsTable.id, {
      onDelete: "set null",
    }),
    agentVersionId: uuid("agent_version_id").references(
      () => agentVersionsTable.id,
      { onDelete: "set null" }
    ),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    unique("unique_phone_number").on(table.number),
    index("phone_numbers_organizationId_idx").on(table.organizationId),
  ]
)
