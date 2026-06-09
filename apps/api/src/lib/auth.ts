import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"

import { db } from "@workspace/db/client"
import * as schema from "@workspace/db/schema/auth"
import { env } from "@/lib/env"

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
    async sendResetPassword(data) {
      console.log("send-reset-password-email", {
        to: data.user.email,
        name: data.user.name,
        url: data.url,
      })
    },
  },
  telemetry: {
    enabled: false,
  },
  baseURL: env.API_URL,
  trustedOrigins: [env.FRONTEND_URL],
  secret: env.BETTER_AUTH_SECRET,
})
