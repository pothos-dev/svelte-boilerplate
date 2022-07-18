/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
  interface Session {
    user: DecodedIdToken
  }

  // interface Locals {}
  // interface Platform {}
  // interface Stuff {}
}
