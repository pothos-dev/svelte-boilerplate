import { browser } from '$app/env'
import { getDoc, getFirestore, doc, setDoc, enableIndexedDbPersistence } from 'firebase/firestore'
import { app } from '~/lib/firebase/app'

const firestore = getFirestore(app)

export async function readDoc<T>(path: string) {
  const ref = doc(firestore, path)
  const snapshot = await getDoc(ref)
  return snapshot.data() as T
}

export async function writeDoc<T>(path: string, data: T) {
  const ref = doc(firestore, path)
  await setDoc(ref, data)
}
