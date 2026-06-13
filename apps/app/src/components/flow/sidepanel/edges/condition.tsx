import { Field, FieldGroup, FieldLabel } from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import { useAgentStore } from "@/stores/agent"
import { FlowSidePanelBase } from "../base"

type EdgePanelProps = {
  edgeId: string
}

export function EdgePanel({ edgeId }: EdgePanelProps) {
  const edge = useAgentStore((state) =>
    state.draftConfig.edges.find((entry) => entry.id === edgeId)
  )
  const setEdge = useAgentStore((state) => state.setEdge)

  if (!edge) {
    return null
  }

  return (
    <FlowSidePanelBase title="Edge">
      <FieldGroup>
        <Field>
          <FieldLabel>Condition</FieldLabel>
          <Input
            value={edge.data.condition}
            onChange={(event) =>
              setEdge({
                ...edge,
                data: { ...edge.data, condition: event.target.value },
              })
            }
          />
        </Field>
      </FieldGroup>
    </FlowSidePanelBase>
  )
}
