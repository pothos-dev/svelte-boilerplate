import type { User } from 'firebase/auth'
import { derived, readable } from 'svelte/store'
import { auth } from '~/lib/firebase/auth'

export const currentUser = readable<User | null | undefined>(undefined, set =>
  auth.onAuthStateChanged(user => {
    return set(user)
  })
)
