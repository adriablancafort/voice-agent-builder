import { PlayIcon } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import { useAgentStore } from "@/stores/agent"

export function TestAgentButton() {
  const openSidePanel = useAgentStore((state) => state.openSidePanel)

  return (
    <Button variant="outline" onClick={() => openSidePanel({ kind: "test" })}>
      <PlayIcon />
      Test
    </Button>
  )
}
