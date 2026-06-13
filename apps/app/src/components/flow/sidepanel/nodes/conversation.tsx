import type { FlowConversationNode } from "@workspace/shared/agent-config/types"
import { Field, FieldGroup, FieldLabel } from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import { Tabs, TabsList, TabsTrigger } from "@workspace/ui/components/tabs"
import { Textarea } from "@workspace/ui/components/textarea"
import { useAgentStore } from "@/stores/agent"
import { FlowSidePanelBase } from "../base"

type ConversationNodePanelProps = {
  node: FlowConversationNode
}

export function ConversationNodePanel({ node }: ConversationNodePanelProps) {
  const setNode = useAgentStore((state) => state.setNode)

  return (
    <FlowSidePanelBase
      title={node.data.isStart ? "Start node" : "Conversation node"}
    >
      <FieldGroup>
        <Field>
          <FieldLabel>Name</FieldLabel>
          <Input
            value={node.data.name}
            onChange={(event) =>
              setNode({
                ...node,
                data: { ...node.data, name: event.target.value },
              })
            }
          />
        </Field>
        <Field>
          <Tabs
            value={node.data.instructions.type}
            onValueChange={(value) => {
              if (value === "prompt" || value === "say") {
                setNode({
                  ...node,
                  data: {
                    ...node.data,
                    instructions: { ...node.data.instructions, type: value },
                  },
                })
              }
            }}
          >
            <TabsList>
              <TabsTrigger value="prompt">Prompt</TabsTrigger>
              <TabsTrigger value="say">Say</TabsTrigger>
            </TabsList>
          </Tabs>

          <Textarea
            rows={8}
            value={node.data.instructions.text}
            onChange={(event) =>
              setNode({
                ...node,
                data: {
                  ...node.data,
                  instructions: {
                    ...node.data.instructions,
                    text: event.target.value,
                  },
                },
              })
            }
          />
        </Field>
      </FieldGroup>
    </FlowSidePanelBase>
  )
}
