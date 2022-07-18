import type { RequestHandler } from "@sveltejs/kit"
import { createSessionCookie } from "~/lib/firebase/admin"

export const get: RequestHandler = async ({ url }) => {
  const idToken = url.searchParams.get("idToken")!
  const session = await createSessionCookie(idToken)
  return { headers: { "Set-Cookie": `session=${session}; HttpOnly; Secure; Path=/` } }
}
