import type { RequestEvent } from "@sveltejs/kit"
import { createSessionCookie } from "~/lib/firebase/admin"

// Given an `idToken` produced by firebase auth on the client, this creates a session
// cookie encoding the user credentials and set it as the `session` cookie.
export async function get({ url }: RequestEvent) {
  const idToken = url.searchParams.get("idToken")!
  const session = await createSessionCookie(idToken)
  return {
    status: 200,
    headers: { "Set-Cookie": `session=${session}; HttpOnly; Secure; Path=/;` },
  }
}

// Called after logging out on the client, deletes the `session` cookie.
export function del() {
  return {
    status: 200,
    headers: { "Set-Cookie": "session=; Max-Age=0; Path=/;" },
  }
}
