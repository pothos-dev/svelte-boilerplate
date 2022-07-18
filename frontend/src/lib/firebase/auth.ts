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
  return user
}

// Logs out current user
export async function logout() {
  await auth.signOut()
}
