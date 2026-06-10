import { queryOptions } from "@tanstack/react-query"

import { organization } from "@/lib/auth/client"

export function fullOrganizationQueryOptions() {
  return queryOptions({
    queryKey: ["full-organization"],
    queryFn: async () => {
      const { data } = await organization.getFullOrganization()
      return data
    },
    staleTime: 1000 * 60,
  })
}

export function organizationsListQueryOptions() {
  return queryOptions({
    queryKey: ["organizations-list"],
    queryFn: async () => {
      const { data } = await organization.list()
      return data
    },
    staleTime: 1000 * 60,
  })
}
