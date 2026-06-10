import { createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/(authorized)/(organization)/(sidebar)/")(
  {
    beforeLoad: () => {
      throw redirect({ to: "/agents" })
    },
  }
)
