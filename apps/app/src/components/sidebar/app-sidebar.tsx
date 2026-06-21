import { HistoryIcon, PhoneIcon, WorkflowIcon } from "lucide-react"
import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@workspace/ui/components/sidebar"
import { NavMain } from "@/components/sidebar/nav-main"
import { NavUser } from "@/components/sidebar/nav-user"
import { OrganizationSwitcher } from "@/components/sidebar/organization-switcher"

const navSections = [
  {
    title: "Build",
    items: [
      {
        title: "Agents",
        url: "/agents",
        icon: <WorkflowIcon />,
      },
    ],
  },
  {
    title: "Deploy",
    items: [
      {
        title: "Phone numbers",
        url: "/phone-numbers",
        icon: <PhoneIcon />,
      },
    ],
  },
  {
    title: "Monitor",
    items: [
      {
        title: "Calls",
        url: "/calls",
        icon: <HistoryIcon />,
      },
    ],
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <OrganizationSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain sections={navSections} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
