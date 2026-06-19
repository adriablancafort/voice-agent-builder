const cartesiaVoices = [
  {
    id: "a167e0f3-df7e-4d52-a9c3-f949145efdab",
    name: "Blake",
    languages: ["en-US"],
    description: "Energetic American adult male",
  },
  {
    id: "5c5ad5e7-1020-476b-8b91-fdcbe9cc313c",
    name: "Daniela",
    languages: ["es-MX"],
    description: "Calm and trusting Mexican female",
  },
  {
    id: "9626c31c-bec5-4cca-baa8-f8ba9e84c8bc",
    name: "Jacqueline",
    languages: ["en-US"],
    description: "Confident, young American adult female",
  },
  {
    id: "f31cc6a7-c1e8-4764-980c-60a361443dd1",
    name: "Robyn",
    languages: ["en-AU"],
    description: "Neutral, mature Australian female",
  },
]

const deepgramAura2Voices = [
  {
    id: "apollo",
    name: "Apollo",
    languages: ["en-US"],
    description: "Comfortable, casual male",
  },
  {
    id: "athena",
    name: "Athena",
    languages: ["en-US"],
    description: "Smooth, professional female",
  },
  {
    id: "odysseus",
    name: "Odysseus",
    languages: ["en-US"],
    description: "Calm, professional male",
  },
  {
    id: "theia",
    name: "Theia",
    languages: ["en-AU"],
    description: "Expressive, polite female",
  },
]

const elevenlabsVoices = [
  {
    id: "Xb7hH8MSUJpSbSDYk0k2",
    name: "Alice",
    languages: ["en-GB"],
    description: "Clear and engaging, friendly British woman",
  },
  {
    id: "iP95p4xoKVk53GoZ742B",
    name: "Chris",
    languages: ["en-US"],
    description: "Natural and real American male",
  },
  {
    id: "cjVigY5qzO86Huf0OWal",
    name: "Eric",
    languages: ["es-MX"],
    description: "A smooth tenor Mexican male",
  },
  {
    id: "cgSgspJ2msm6clMCkdW9",
    name: "Jessica",
    languages: ["en-US"],
    description: "Young and popular, playful American female",
  },
]

const inworldVoices = [
  {
    id: "Ashley",
    name: "Ashley",
    languages: ["en-US"],
    description: "Warm, natural American female",
  },
  {
    id: "Diego",
    name: "Diego",
    languages: ["es-MX"],
    description: "Soothing, gentle Mexican male",
  },
  {
    id: "Edward",
    name: "Edward",
    languages: ["en-US"],
    description: "Fast-talking, emphatic American male",
  },
  {
    id: "Olivia",
    name: "Olivia",
    languages: ["en-GB"],
    description: "Upbeat, friendly British female",
  },
]

const rimeArcanaVoices = [
  {
    id: "astra",
    name: "Astra",
    languages: ["en-US"],
    description: "Chipper, upbeat American female",
  },
  {
    id: "celeste",
    name: "Celeste",
    languages: ["en-US"],
    description: "Chill Gen-Z American female",
  },
  {
    id: "luna",
    name: "Luna",
    languages: ["en-US"],
    description: "Chill but excitable American female",
  },
  {
    id: "ursa",
    name: "Ursa",
    languages: ["en-US"],
    description: "Young, emo American male",
  },
]

const xaiVoices = [
  {
    id: "ara",
    name: "Ara",
    languages: ["en-US"],
    description: "Warm, friendly",
  },
  {
    id: "eve",
    name: "Eve",
    languages: ["en-US"],
    description: "Energetic, upbeat",
  },
  {
    id: "leo",
    name: "Leo",
    languages: ["en-US"],
    description: "Authoritative, strong",
  },
  {
    id: "rex",
    name: "Rex",
    languages: ["en-US"],
    description: "Confident, clear",
  },
]

export const VOICES = {
  cartesia: {
    "sonic-2": cartesiaVoices,
    "sonic-3": cartesiaVoices,
    "sonic-3-2025-10-27": cartesiaVoices,
    "sonic-3-2026-01-12": cartesiaVoices,
    "sonic-3-latest": cartesiaVoices,
    "sonic-3.5": cartesiaVoices,
    "sonic-3.5-2026-05-04": cartesiaVoices,
    "sonic-latest": cartesiaVoices,
    "sonic-turbo": cartesiaVoices,
  },
  deepgram: {
    "aura-2": deepgramAura2Voices,
  },
  elevenlabs: {
    eleven_flash_v2: elevenlabsVoices,
    eleven_flash_v2_5: elevenlabsVoices,
    eleven_multilingual_v2: elevenlabsVoices,
    eleven_turbo_v2: elevenlabsVoices,
    eleven_turbo_v2_5: elevenlabsVoices,
    eleven_v3: elevenlabsVoices,
  },
  inworld: {
    "inworld-tts-1.5-max": inworldVoices,
    "inworld-tts-1.5-mini": inworldVoices,
    "inworld-tts-2": inworldVoices,
  },
  rime: {
    arcana: rimeArcanaVoices,
  },
  xai: {
    "tts-1": xaiVoices,
  },
}
