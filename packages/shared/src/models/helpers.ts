import { MODELS } from "./catalog"
import type { ModelKind } from "./types"
import { VOICES } from "./voices"

type CatalogModel = {
  name: string
  languages?: readonly string[]
  usdPerMinute: number
}

type CatalogProvider = {
  name: string
  models: Record<string, CatalogModel>
}

type VoiceEntry = {
  id: string
  name: string
  languages: readonly string[]
  description: string
}

function splitModelId(modelId: string) {
  const slash = modelId.indexOf("/")
  if (slash === -1) {
    return undefined
  }

  return {
    providerId: modelId.slice(0, slash),
    modelKey: modelId.slice(slash + 1),
  }
}

function toModelId(providerId: string, modelKey: string) {
  return `${providerId}/${modelKey}`
}

function getKindCatalog(kind: ModelKind) {
  return MODELS[kind] as Record<string, CatalogProvider>
}

export function getProviderId(kind: ModelKind, modelId: string) {
  return splitModelId(modelId)?.providerId ?? ""
}

export function getModelPricePerMinute(kind: ModelKind, modelId: string) {
  const parts = splitModelId(modelId)
  if (!parts) {
    throw new Error(`Invalid model id: ${modelId}`)
  }

  const model = getKindCatalog(kind)[parts.providerId]?.models[parts.modelKey]
  if (!model) {
    throw new Error(`Unknown ${kind} model: ${modelId}`)
  }

  return model.usdPerMinute
}

export function formatUsdPerMinute(usdPerMinute: number) {
  return `$${usdPerMinute.toFixed(3)}/min`
}

export function getModelSections(kind: ModelKind, currentModelId?: string) {
  return Object.entries(getKindCatalog(kind))
    .map(([providerId, provider]) => {
      const models = Object.entries(provider.models).map(
        ([modelKey, model]) => ({
          id: toModelId(providerId, modelKey),
          name: model.name,
          usdPerMinute: model.usdPerMinute,
        })
      )

      if (
        currentModelId &&
        !models.some((model) => model.id === currentModelId) &&
        splitModelId(currentModelId)?.providerId === providerId
      ) {
        models.unshift({
          id: currentModelId,
          name: currentModelId,
          usdPerMinute: 0,
        })
      }

      return {
        id: providerId,
        name: provider.name,
        models,
      }
    })
    .filter((provider) => provider.models.length > 0)
}

export function getVoices(modelId: string) {
  const parts = splitModelId(modelId)
  if (!parts) {
    return [] as VoiceEntry[]
  }

  const providerVoices = VOICES[parts.providerId as keyof typeof VOICES] as
    | Record<string, readonly VoiceEntry[]>
    | undefined

  const voices = providerVoices?.[parts.modelKey]
  return voices ? [...voices] : []
}

export function pickFirstModel(kind: ModelKind, providerId?: string) {
  const sections = getModelSections(kind)
  const section = providerId
    ? sections.find((entry) => entry.id === providerId)
    : sections[0]

  return section?.models[0]?.id
}

export function pickFirstVoice(modelId: string, voiceId?: string) {
  const voices = getVoices(modelId)
  if (voices.length === 0) {
    return undefined
  }

  if (voiceId && voices.some((voice) => voice.id === voiceId)) {
    return voiceId
  }

  return voices[0]?.id
}
