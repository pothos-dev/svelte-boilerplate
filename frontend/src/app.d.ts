/// <reference types="@sveltejs/kit" />

import type { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier"
import type { User } from "firebase/auth"

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  declare namespace App {
    interface Session {
      user: null | {
        email: string | null
        photoURL: string | null
      }
    }

    // interface Locals {}
    // interface Platform {}
    interface Stuff {
      preloadedDocuments: { [path: string]: any }
    }
  }
}
