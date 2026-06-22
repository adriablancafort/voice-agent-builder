import {
  formatUsdPerMinute,
  getModelSections,
  getProviderId,
  getVoices,
  pickFirstModel,
  pickFirstVoice,
} from "@workspace/shared/models/helpers"
import type { ModelKind } from "@workspace/shared/models/types"
import { Field, FieldGroup, FieldLabel } from "@workspace/ui/components/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import { useAgentStore } from "@/stores/agent"
import { FlowSidePanelBase } from "./base"

function ProviderModelSelect({
  kind,
  label,
  modelId,
  onModelChange,
}: {
  kind: ModelKind
  label: string
  modelId: string
  onModelChange: (modelId: string) => void
}) {
  const providerId = getProviderId(kind, modelId)
  const sections = getModelSections(kind, modelId)
  const section = sections.find((entry) => entry.id === providerId)
  const models = section?.models ?? []
  const selectedModel =
    models.find((model) => model.id === modelId) ?? models[0]

  return (
    <div className="grid grid-cols-5 items-end gap-4">
      <Field className="col-span-2">
        <FieldLabel>{label}</FieldLabel>
        <Select
          value={providerId}
          onValueChange={(nextProviderId) => {
            if (!nextProviderId) return
            const nextModel = pickFirstModel(kind, nextProviderId)
            if (nextModel) {
              onModelChange(nextModel)
            }
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={`Select ${label} provider`}>
              {section?.name}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {sections.map((entry) => (
              <SelectItem key={entry.id} value={entry.id}>
                {entry.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <Field className="col-span-3">
        <Select
          value={modelId}
          onValueChange={(nextModelId) => {
            if (nextModelId) onModelChange(nextModelId)
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={`Select ${label} model`}>
              {selectedModel.name}
              <span className="text-muted-foreground">
                - {formatUsdPerMinute(selectedModel.usdPerMinute)}
              </span>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {models.map((model) => (
              <SelectItem key={model.id} value={model.id}>
                {model.name}
                <span className="text-muted-foreground">
                  - {formatUsdPerMinute(model.usdPerMinute)}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
    </div>
  )
}

export function ModelsConfigPanel() {
  const draftConfig = useAgentStore((state) => state.draftConfig)
  const setConfig = useAgentStore((state) => state.setConfig)

  const ttsModelId = draftConfig.tts.model
  const ttsVoices = getVoices(ttsModelId)
  const ttsVoiceId = pickFirstVoice(ttsModelId, draftConfig.tts.voice)
  const ttsVoice = ttsVoices.find((voice) => voice.id === ttsVoiceId)

  return (
    <FlowSidePanelBase title="Models">
      <FieldGroup>
        <ProviderModelSelect
          kind="stt"
          label="STT"
          modelId={draftConfig.stt.model}
          onModelChange={(model) => {
            setConfig({
              ...draftConfig,
              stt: { ...draftConfig.stt, model },
            })
          }}
        />

        <ProviderModelSelect
          kind="llm"
          label="LLM"
          modelId={draftConfig.llm.model}
          onModelChange={(model) => {
            setConfig({
              ...draftConfig,
              llm: { ...draftConfig.llm, model },
            })
          }}
        />

        <ProviderModelSelect
          kind="tts"
          label="TTS"
          modelId={ttsModelId}
          onModelChange={(model) => {
            setConfig({
              ...draftConfig,
              tts: {
                ...draftConfig.tts,
                model,
                voice: pickFirstVoice(model, draftConfig.tts.voice),
              },
            })
          }}
        />

        <Field>
          <FieldLabel>Voice</FieldLabel>
          <Select
            value={ttsVoiceId ?? ""}
            onValueChange={(voice) => {
              if (!voice) return
              setConfig({
                ...draftConfig,
                tts: { ...draftConfig.tts, voice },
              })
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select voice">
                {ttsVoice?.name}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {ttsVoices.map((voice) => (
                <SelectItem key={voice.id} value={voice.id}>
                  <span className="font-medium">{voice.name}</span>
                  <span className="text-muted-foreground">
                    {" "}
                    - {voice.description}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </FieldGroup>
    </FlowSidePanelBase>
  )
}
