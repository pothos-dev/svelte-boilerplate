<script lang="ts">
import { onMount } from 'svelte'

import { readDoc, writeDoc } from '~/lib/firebase/firestore'

type Profile = {
  userName: string
  firstName: string
  lastName: string
}

let userName = ''
let firstName = ''
let lastName = ''

onMount(async () => {
  const profile = await readDoc<Profile | undefined>('users/me')
  if (profile) {
    userName = profile.userName
    firstName = profile.firstName
    lastName = profile.lastName
  }
})

async function submit() {
  await writeDoc('users/me', {
    userName,
    firstName,
    lastName,
  })
}
</script>

<form class="form-control w-full max-w-md gap-2" on:submit|preventDefault="{submit}">
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

  <input class="btn" type="submit" value="Save profile" />
</form>
