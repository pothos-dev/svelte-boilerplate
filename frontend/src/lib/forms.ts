import { onMount } from "svelte"
import { createForm } from "svelte-forms-lib"
import { writable, type Readable } from "svelte/store"
import { getPreloadedDataOrNull, readDataOrNull, writeData } from "~/lib/firebase/firestore"

type FormProps<T> = Omit<Parameters<typeof createForm<T>>[0], "onSubmit"> & {
  path: string
}
export function createFirestoreForm<T>({
  path,
  initialValues,
  validate,
  validationSchema,
}: FormProps<T>) {
  const formResult = createForm({
    initialValues,
    validate,
    validationSchema,
    onSubmit: data => writeData(path, data),
  })

  const isLoaded = writable(false)

  const preloadedValues = getPreloadedDataOrNull<T>(path)
  if (preloadedValues != null) {
    formResult.form.set(preloadedValues)
    isLoaded.set(true)
  } else {
    onMount(async () => {
      const data = await readDataOrNull<T>(path)
      if (data) formResult.form.set(data)
      isLoaded.set(true)
    })
  }

  return {
    ...formResult,
    isLoaded: isLoaded as Readable<boolean>,
  }
}
