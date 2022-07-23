/// <reference types="@sveltejs/kit" />

import type { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier"

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  declare namespace App {
    interface Session {
      user: DecodedIdToken | null
    }

    // interface Locals {}
    // interface Platform {}
    interface Stuff {
      preloadedDocuments: { [path: string]: any }
    }
  }
}
