<script lang="ts">
import { browser } from '$app/env'

import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { currentUser } from '~/features/Authentication/states'
import { auth } from '~/lib/firebase/auth'

function login() {
  signInWithPopup(auth, new GoogleAuthProvider())
}
</script>

{#if browser && $currentUser === null}
  <button class="btn" on:click="{login}">login</button>
{/if}
