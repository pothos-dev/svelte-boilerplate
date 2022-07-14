import type { User } from 'firebase/auth'
import { derived, readable } from 'svelte/store'
import { auth } from '~/lib/firebase/auth'

export const currentUser = readable<User | null>(auth.currentUser, set =>
  auth.onAuthStateChanged(user => set(user))
)

export const isLoggedIn = derived(currentUser, user => user != null)
