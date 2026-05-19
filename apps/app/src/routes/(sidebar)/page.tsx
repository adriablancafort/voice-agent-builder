import { createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/(sidebar)/")({
  beforeLoad: () => {
    throw redirect({ to: "/agents" })
  },
})
