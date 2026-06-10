import { createAuthClient } from "better-auth/client"
import { organizationClient } from "better-auth/client/plugins"

import { env } from "@/lib/env"

export const authClient = createAuthClient({
  baseURL: env.API_URL,
  plugins: [organizationClient()],
})

export const {
  accountInfo,
  changeEmail,
  changePassword,
  deleteUser,
  getAccessToken,
  getSession,
  linkSocial,
  listAccounts,
  listSessions,
  organization,
  refreshToken,
  requestPasswordReset,
  resetPassword,
  revokeOtherSessions,
  revokeSession,
  revokeSessions,
  sendVerificationEmail,
  signIn,
  signOut,
  signUp,
  unlinkAccount,
  updateSession,
  updateUser,
  verifyEmail,
} = authClient
