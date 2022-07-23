{#if browser}
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
        disabled="{!$isLoaded}"
      />
    </label>

    <div class="flex flex-row gap-2">
      <input
        class="input input-bordered w-full"
        class:input-error="{$errors.firstName != null}"
        type="text"
        placeholder="First name"
        id="firstName"
        name="firstName"
        bind:value="{$form.firstName}"
        disabled="{!$isLoaded}"
      />
      <input
        class="input input-bordered w-full"
        type="text"
        placeholder="Last name"
        id="lastName"
        name="lastName"
        bind:value="{$form.lastName}"
        disabled="{!$isLoaded}"
      />
    </div>

    {#if $isModified}
      <button class="btn gap-2" type="submit">
        <span class="iconify" data-icon="material-symbols:save-outline"></span>
        Save profile
      </button>
    {/if}
  </form>
{/if}

<script lang="ts" context="module">
  import { browser } from "$app/env"
  import { createFirestoreForm } from "~/lib/forms"
  import { session } from "$app/stores"
  import type { Load } from "@sveltejs/kit"
  import { preloadData } from "~/lib/firebase/firestore"

  type Profile = {
    userName: string
    firstName: string
    lastName: string
  }

  export const load: Load = async ({ session }) => {
    return {
      stuff: await preloadData("users/" + session.user?.email),
    }
  }
</script>

<script lang="ts">
  const { form, handleSubmit, isModified, isLoaded, errors } = createFirestoreForm<Profile>({
    path: "users/" + $session.user?.email,
    initialValues: {
      userName: "",
      firstName: "",
      lastName: "",
    },
    validate(profile) {
      return {
        firstName: "First name is required",
      }
    },
  })
</script>
