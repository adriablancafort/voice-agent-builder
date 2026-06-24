import type { FlowEndNode } from "@workspace/shared/api/agent-config/types"
import { Field, FieldGroup, FieldLabel } from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import { useAgentStore } from "@/stores/agent"
import { FlowSidePanelBase } from "../base"

type EndNodePanelProps = {
  node: FlowEndNode
}

export function EndNodePanel({ node }: EndNodePanelProps) {
  const readOnly = useAgentStore((state) => state.readOnly)
  const setNode = useAgentStore((state) => state.setNode)

  return (
    <FlowSidePanelBase title="End node">
      <FieldGroup>
        <Field>
          <FieldLabel>Name</FieldLabel>
          <Input
            value={node.data.name}
            readOnly={readOnly}
            onChange={(event) =>
              setNode({
                ...node,
                data: { ...node.data, name: event.target.value },
              })
            }
          />
        </Field>
      </FieldGroup>
    </FlowSidePanelBase>
  )
}
