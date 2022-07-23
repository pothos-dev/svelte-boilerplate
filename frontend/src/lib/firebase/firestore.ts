import {
  getDoc,
  getFirestore,
  doc,
  setDoc,
  onSnapshot,
  updateDoc,
  type UpdateData,
} from "firebase/firestore"
import { app } from "~/lib/firebase/app"
import { page } from "$app/stores"
import { get, writable, type Readable, type Updater, type Writable } from "svelte/store"

const firestore = getFirestore(app)

/**
 * Preloading data
 */

// This method should be called inside the `load` function of a page.
// It will preload data on the server and store it in `$page.stuff`, where it is
// available for client-side code.
export async function preloadData<T>(...paths: string[]) {
  const preloadedDocuments: { [path: string]: any } = {}

  await Promise.all(
    paths.map(async path => {
      const value = await readDataOrNull<T>(path)
      preloadedDocuments[path] = value
    })
  )

  return { preloadedDocuments }
}

// Returns a preloaded document at path.
export function getPreloadedDataOrNull<T>(path: string): T | null {
  const data = get(page).stuff.preloadedDocuments[path]
  return data ?? null
}

// Returns a preloaded document at path. Throws if the document was not preloaded.
export function getPreloadedData<T>(path: string): T {
  const data = getPreloadedDataOrNull<T>(path)
  if (data == null) {
    throw Error(`Accessing document at ${path} before it was loaded`)
  }
  return data
}

/**
 * Reading data
 */

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

// Returns a readable store that contains the document stored at path.
// The store automatically reflects any changes to the underlying document.
// Requires that the document is preloaded.
export function readableData<T>(path: string): Readable<T> {
  const initialValue = getPreloadedData<T>(path)
  const store = writable(initialValue, set => {
    const ref = doc(firestore, path)
    const unsubscribe = onSnapshot(ref, snapshot => {
      const value = snapshot.data() as T
      set(value)
    })
    return () => unsubscribe()
  })

  return store
}

/**
 * Writing data
 */

// Writes document data to path.
export async function writeData<T>(path: string, data: T) {
  const ref = doc(firestore, path)
  await setDoc(ref, data)
}

// Updates a document at path, by specifying a subset of fields to update.
export async function updateData<T extends object>(path: string, data: UpdateData<T>) {
  const ref = doc(firestore, path)
  await updateDoc(ref, data)
}

// Returns a writable store that contains the document stored at path.
// The store automatically reflects any changes to the underlying document.
// Writing to the store also writes to the underlying document.
// Requires that the document is preloaded.
export function writableData<T>(path: string): Writable<T> {
  const store = readableData<T>(path)
  async function set(data: T) {
    return writeData(path, data)
  }
  async function update(updater: Updater<T>) {
    const data = get(store)
    const updatedData = updater(data)
    await writeData(path, updatedData)
  }
  return { ...store, set, update }
}
