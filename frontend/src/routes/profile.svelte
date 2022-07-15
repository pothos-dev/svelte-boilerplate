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

<script lang="ts" context="module">
  import { readDataOrNull, writeData } from '~/lib/firebase/firestore'

  type Profile = {
    userName: string
    firstName: string
    lastName: string
  }

  export async function load() {
    return {
      props: {
        profile: await readDataOrNull<Profile>('users/me'),
      },
    }
  }
</script>

<script lang="ts">
  export let profile: Profile | undefined

  let userName = profile?.userName ?? ''
  let firstName = profile?.firstName ?? ''
  let lastName = profile?.lastName ?? ''

  async function submit() {
    await writeData('users/me', {
      userName,
      firstName,
      lastName,
    })
  }
</script>
