import { serve } from "@hono/node-server"
import { Hono } from "hono"
import { cors } from "hono/cors"
import { logger } from "hono/logger"
import { env } from "@/lib/env"

const app = new Hono()

app.use(
  "*",
  cors({
    origin: [env.FRONTEND_URL],
    credentials: true,
  })
)

app.use(logger())

app.get("/", (c) => {
  return c.text("Hello Hono!")
})

serve(
  {
    fetch: app.fetch,
    port: env.PORT,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`)
  }
)
