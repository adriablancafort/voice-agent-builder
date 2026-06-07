import type { AgentConfig } from "@workspace/shared/agent-config/types"
import type {
  SipInboundAgentConfigInput,
  WebRtcAgentConfigInput,
} from "@workspace/shared/agents/types"
import { api } from "@/lib/api"

export function loadAgentConfig(
  attributes: Record<string, string | undefined>
) {
  if (attributes.channel === "webrtc") {
    const agentId = attributes.agent_id

    if (!agentId) {
      throw new Error("agent_id is required for webrtc sessions")
    }

    return api.post<AgentConfig, WebRtcAgentConfigInput>(
      "/agents/config/webrtc",
      {
        body: {
          agentId,
          agentVersionId: attributes.agent_version_id || undefined,
        },
      }
    )
  }

  const number = attributes["sip.trunkPhoneNumber"]

  if (!number) {
    throw new Error("sip.trunkPhoneNumber is required for phone calls")
  }

  return api.post<AgentConfig, SipInboundAgentConfigInput>(
    "/agents/config/sip-inbound",
    {
      body: {
        number,
      },
    }
  )
}
