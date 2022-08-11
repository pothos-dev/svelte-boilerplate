// Imports from this file must only be used on the server.

import serviceAccount from "~/secrets/firebase-admin-credentials.json"
import { initializeApp, credential, type ServiceAccount } from "firebase-admin"

const admin = initializeApp({ credential: credential.cert(serviceAccount as ServiceAccount) })

// Session Token is valid for 14 days.
export async function createSessionCookie(idToken: string) {
  return await admin.auth().createSessionCookie(idToken, {
    expiresIn: 1000 * 60 * 60 * 24 * 14,
  })
}

// Returns user for session token.
export async function readSessionCookie(sessionToken: string) {
  try {
    const { email, picture } = await admin.auth().verifySessionCookie(sessionToken, true)
    return {
      email: email ?? null,
      photoURL: picture ?? null,
    }
  } catch (error) {
    return null
  }
}
