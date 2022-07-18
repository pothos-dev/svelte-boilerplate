<div class="form-control w-full max-w-md gap-2">
  <label class="input-group">
    <span>@</span>
    <input
      class="input input-bordered w-full"
      type="text"
      placeholder="username"
      bind:value="{userName}"
    />
  </label>

  <input
    class="input input-bordered w-full"
    type="text"
    placeholder="First name"
    bind:value="{firstName}"
  />
  <input
    class="input input-bordered w-full"
    type="text"
    placeholder="Last name"
    bind:value="{lastName}"
  />

  <button class="btn gap-2" on:click="{submit}">
    <span class="iconify" data-icon="material-symbols:save-outline"></span>
    Save profile
  </button>
</div>

<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'
  import { readDataOrNull, writeData } from '~/lib/firebase/firestore'

  type Profile = {
    userName: string
    firstName: string
    lastName: string
  }

  export const load: Load = async ({ session }) => {
    console.log({ session })
    return {
      props: {
        profile: await readDataOrNull<Profile>('users/me'),
      },
    }
  }
</script>

<script lang="ts">
  export let profile: Profile | null

  let userName = profile?.userName ?? ''
  let firstName = profile?.firstName ?? ''
  let lastName = profile?.lastName ?? ''

  const submit = () => {
    writeData<Profile>('users/me', { userName, firstName, lastName })
  }
</script>
