import { onMount } from "svelte"
import { createForm } from "svelte-forms-lib"
import { writable, type Readable } from "svelte/store"
import { getPreloadedDataOrNull, readDataOrNull, writeData } from "~/lib/firebase/firestore"

// We extend the signature of `createForm` from `svelte-forms-lib` by adding the path
// of the document that contains our form state.
// Submitting the form also automatically updates the document.
type SvelteFormsProps<T> = Parameters<typeof createForm<T>>[0]
type FormProps<T> = Omit<SvelteFormsProps<T>, "onSubmit"> & {
  path: string
}
export function createFirestoreForm<T>({
  path,
  initialValues,
  validate,
  validationSchema,
}: FormProps<T>) {
  const preloadedValues = getPreloadedDataOrNull<T>(path)
  const isLoaded = writable(preloadedValues != null)

  // Create the forms given the initial values passed to this function.
  const createFormResult = createForm({
    initialValues: preloadedValues ?? initialValues,
    validate,
    validationSchema,
    onSubmit: data => writeData(path, data),
  })

  if (preloadedValues == null) {
    onMount(async () => {
      const data = await readDataOrNull<T>(path)
      if (data) createFormResult.form.set(data)
      isLoaded.set(true)
    })
  }

  return {
    ...createFormResult,
    isLoaded: isLoaded as Readable<boolean>,
  }
}
