import type { RequestEvent } from "@sveltejs/kit"
import { createSessionCookie } from "~/lib/firebase/admin"

export async function get({ url }: RequestEvent) {
  const idToken = url.searchParams.get("idToken")!
  const session = await createSessionCookie(idToken)
  return {
    status: 200,
    headers: {
      "Set-Cookie": `session=${session}; HttpOnly; Secure; Path=/;`,
    },
  }
}

export function del() {
  return {
    status: 200,
    headers: { "Set-Cookie": "session=; Max-Age=0; Path=/;" },
  }
}
