import { onMount } from "svelte"
import { createForm } from "svelte-forms-lib"
import { writable, type Readable } from "svelte/store"
import { readDataOrNull, writeData } from "~/lib/firebase/firestore"

type FormProps<T> = Omit<Parameters<typeof createForm<T>>[0], "onSubmit"> & {
  path: string
}
export function createFirestoreForm<T>({ path, ...formProps }: FormProps<T>) {
  const formResult = createForm({
    ...formProps,
    onSubmit: data => writeData(path, data),
  })

  const isLoaded = writable(false)
  onMount(async () => {
    const data = await readDataOrNull<T>(path)
    if (data) formResult.form.set(data)
    isLoaded.set(true)
  })

  return { ...formResult, isLoaded: isLoaded as Readable<boolean> }
}
