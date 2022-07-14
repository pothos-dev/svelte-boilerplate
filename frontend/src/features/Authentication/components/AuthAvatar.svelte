<script lang="ts">
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '~/lib/firebase/auth'

const isLoggedIn = auth.currentUser
const name = auth.currentUser?.displayName
</script>

{#if isLoggedIn}
  <div>Logged in as {name}</div>
{/if}
