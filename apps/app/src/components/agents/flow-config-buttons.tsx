import { Panel } from "@xyflow/react"
import { MicIcon, PencilLineIcon } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import { AddNodeButton } from "@/components/agents/add-node-button"
import { useAgentStore } from "@/stores/agent"

export function FlowConfigButtons() {
  const openSidePanel = useAgentStore((state) => state.openSidePanel)

  return (
    <Panel position="top-left" className="flex flex-col gap-3">
      <AddNodeButton />

      <div>
        <Button
          variant="outline"
          onClick={() => openSidePanel({ kind: "global-prompt" })}
        >
          <PencilLineIcon />
          Global prompt
        </Button>
      </div>

      <div>
        <Button
          variant="outline"
          onClick={() => openSidePanel({ kind: "models-config" })}
        >
          <MicIcon />
          Models
        </Button>
      </div>
    </Panel>
  )
}
