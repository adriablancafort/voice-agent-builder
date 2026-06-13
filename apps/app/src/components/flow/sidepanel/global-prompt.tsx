import { Field, FieldGroup, FieldLabel } from "@workspace/ui/components/field"
import { Textarea } from "@workspace/ui/components/textarea"
import { useAgentStore } from "@/stores/agent"
import { FlowSidePanelBase } from "./base"

export function GlobalPromptPanel() {
  const draftConfig = useAgentStore((state) => state.draftConfig)
  const setConfig = useAgentStore((state) => state.setConfig)

  return (
    <FlowSidePanelBase title="Global prompt">
      <FieldGroup>
        <Field>
          <FieldLabel>Global prompt</FieldLabel>
          <Textarea
            rows={12}
            value={draftConfig.globalPrompt}
            onChange={(event) =>
              setConfig({
                ...draftConfig,
                globalPrompt: event.target.value,
              })
            }
            placeholder="You are a helpful assistant"
          />
        </Field>
      </FieldGroup>
    </FlowSidePanelBase>
  )
}
