<script lang="ts">
  import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
  import { auth } from '~/lib/firebase/auth'

  function onClick() {
    signInWithPopup(auth, new GoogleAuthProvider())
  }
</script>

<button class="btn" on:click={onClick}>login</button>
