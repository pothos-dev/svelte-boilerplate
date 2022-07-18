import { getDoc, getFirestore, doc, setDoc } from "firebase/firestore"
import { app } from "~/lib/firebase/app"

const firestore = getFirestore(app)

// Reads document data stored at path.
export async function readDataOrNull<T>(path: string): Promise<T | null> {
  const ref = doc(firestore, path)
  const snapshot = await getDoc(ref)
  return (snapshot.data() as T) ?? null
}

// Reads document data stored at path. Throws if the document is not found.
export async function readData<T>(path: string): Promise<T> {
  const data = await readDataOrNull<T>(path)
  if (data == null) throw Error(`${path} is null`)
  return data
}

// Writes document data to path.
export async function writeData<T>(path: string, data: T) {
  const ref = doc(firestore, path)
  await setDoc(ref, data)
}
