import type { RequestEvent, RequestHandler } from "@sveltejs/kit"
import { createSessionCookie } from "~/lib/firebase/admin"

export async function GET({ url }: RequestEvent) {
  const idToken = url.searchParams.get("idToken")!
  const session = await createSessionCookie(idToken)
  return {
    status: 200,
    headers: {
      "Set-Cookie": `session=${session}; HttpOnly; Secure; Path=/;`,
    },
  }
}

export function DELETE() {
  return {
    status: 200,
    headers: { "Set-Cookie": "session=; Max-Age=0; Path=/;" },
  }
}
