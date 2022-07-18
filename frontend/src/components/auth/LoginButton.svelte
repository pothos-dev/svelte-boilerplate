{#if browser}
  {#if $currentUser === null}
    <button class="btn" on:click="{login}">Login</button>
  {/if}
{/if}

<script lang="ts">
  import { browser } from "$app/env"
  import { currentUser, login } from "~/lib/firebase/auth"
</script>
