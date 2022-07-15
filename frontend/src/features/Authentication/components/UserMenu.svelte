<script lang="ts">
import { goto } from '$app/navigation'
import { currentUser } from '~/features/Authentication/states'
import { auth } from '~/lib/firebase/auth'

function gotoProfile() {
  goto('/profile')
}

function logout() {
  auth.signOut()
}
</script>

{#if $currentUser}
  {@const { photoURL, displayName } = $currentUser}

  <!-- Menu Container -->
  <div class="dropdown-end dropdown">
    <!-- Avatar Icon -->
    <button tabindex="0" class="btn-circle">
      <div class="avatar">
        <div class="w-10 rounded-full">
          <img src="{photoURL}" alt="{displayName}" />
        </div>
      </div>
    </button>

    <!-- Menu Content -->
    <ul tabindex="0" class="dropdown-content menu rounded-md bg-base-100 p-2 shadow">
      <li>
        <div on:click="{gotoProfile}">
          <span class="iconify" data-icon="material-symbols:person-outline"></span>
          Profile
        </div>
      </li>

      <li>
        <div on:click="{logout}">
          <span class="iconify" data-icon="material-symbols:logout"></span>
          Logout
        </div>
      </li>
    </ul>
  </div>
{/if}
