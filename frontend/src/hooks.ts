// https://kit.svelte.dev/docs/hooks

import type { GetSession } from "@sveltejs/kit"
import { readSessionCookie } from "~/lib/firebase/admin"

// Reads the `session` cookie from incoming requests to populate the
// session object of SvelteKit. (Session interface is extended in app.d.ts)
export const getSession: GetSession = async ({ request }) => {
  const cookie = request.headers.get("cookie")
  const session = cookie?.match("session=([^;]+)")?.[1]
  const user = await readSessionCookie(session!)
  return { user }
}
