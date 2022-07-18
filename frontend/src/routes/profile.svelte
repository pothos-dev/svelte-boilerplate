<form class="form-control w-full max-w-md gap-2" on:submit="{handleSubmit}">
  <label class="input-group">
    <span>@</span>
    <input
      class="input input-bordered w-full"
      type="text"
      placeholder="username"
      id="username"
      name="username"
      bind:value="{$form.userName}"
    />
  </label>

  <input
    class="input input-bordered w-full"
    type="text"
    placeholder="First name"
    id="firstName"
    name="firstName"
    bind:value="{$form.firstName}"
  />
  <input
    class="input input-bordered w-full"
    type="text"
    placeholder="Last name"
    id="lastName"
    name="lastName"
    bind:value="{$form.lastName}"
  />

  {#if $isModified}
    <button class="btn gap-2" type="submit">
      <span class="iconify" data-icon="material-symbols:save-outline"></span>
      Save profile
    </button>
  {/if}
</form>

<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit"
  import { readDataOrNull, writeData } from "~/lib/firebase/firestore"
  import { createForm } from "svelte-forms-lib"
  import { session } from "$app/stores"

  type Profile = {
    userName: string
    firstName: string
    lastName: string
  }

  export const load: Load = async ({ session }) => {
    const email = session.user.email
    const profile = await readDataOrNull<Profile>("users/" + email)
    return { props: { profile } }
  }
</script>

<script lang="ts">
  export let profile: Profile | null

  const { form, handleSubmit, isModified } = createForm({
    initialValues: profile ?? {
      userName: "",
      firstName: "",
      lastName: "",
    },
    async onSubmit(profile) {
      const email = $session.user.email
      await writeData("users/" + email, profile)
    },
  })
</script>
