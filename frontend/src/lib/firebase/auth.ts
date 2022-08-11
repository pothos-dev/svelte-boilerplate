import { session } from "$app/stores"
import { getAuth, GoogleAuthProvider, signInWithPopup, type User } from "firebase/auth"
import { readable } from "svelte/store"
import { app } from "./app"

const auth = getAuth(app)

// Is undefined during initial load.
// Is null if logged out.
export const currentUser = readable<User | null | undefined>(undefined, set =>
  auth.onAuthStateChanged(user => {
    return set(user)
  })
)

// Logs in with Google
export async function login() {
  const { user } = await signInWithPopup(auth, new GoogleAuthProvider())

  // Exchanges the idToken for a session cookie that is used to authenticate this user towards the server.
  const idToken = await user.getIdToken()
  await fetch(`/api/session?idToken=${idToken}`)

  const { email, photoURL } = user
  session.update(session => ({ ...session, user: { email, photoURL } }))
}

// Logs out current user
export async function logout() {
  // Asks server to delete the session cookie for us (which we can't do here since it is HttpOnly)
  await fetch("/api/session", { method: "DELETE" })
  await auth.signOut()
  session.update(session => ({ ...session, user: null }))
}
