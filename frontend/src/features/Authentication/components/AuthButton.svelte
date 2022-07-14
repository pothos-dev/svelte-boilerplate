<script lang="ts">
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '~/lib/firebase/auth'

const isLoggedIn = auth.currentUser != null

function onClick() {
  console.log('login')
  signInWithPopup(auth, new GoogleAuthProvider())
}
</script>

{#if !isLoggedIn}
  <button class="btn" on:click="{onClick}">login</button>
{/if}
