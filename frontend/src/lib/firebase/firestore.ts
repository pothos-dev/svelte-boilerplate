import { getDoc, getFirestore, doc, setDoc, enableIndexedDbPersistence } from 'firebase/firestore'
import { app } from '~/lib/firebase/app'

const firestore = getFirestore(app)

export async function readData<T>(path: string): Promise<T> {
  const data = await readDataOrNull<T>(path)
  if (data == null) throw Error(`${path} is null`)
  return data
}

export async function readDataOrNull<T>(path: string): Promise<T | null> {
  const ref = doc(firestore, path)
  const snapshot = await getDoc(ref)
  return (snapshot.data() as T) ?? null
}

export async function writeData<T>(path: string, data: T) {
  const ref = doc(firestore, path)
  await setDoc(ref, data)
}
