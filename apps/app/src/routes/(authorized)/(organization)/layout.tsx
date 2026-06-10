import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"

import { fullOrganizationQueryOptions } from "@/lib/auth/organization"

export const Route = createFileRoute("/(authorized)/(organization)")({
  beforeLoad: async ({ context }) => {
    const organization = await context.queryClient.ensureQueryData(
      fullOrganizationQueryOptions()
    )

    if (!organization) {
      throw redirect({ to: "/select-organization" })
    }
  },
  component: Outlet,
})
