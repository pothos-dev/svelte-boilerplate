<script lang="ts">
import { currentUser } from '~/features/Authentication/states'
import { auth } from '~/lib/firebase/auth'

async function logout() {
  await auth.signOut()
}
</script>

{#if $currentUser}
  {@const { photoURL, displayName } = $currentUser}

  <!-- Menu Container -->
  <div class="dropdown-end dropdown">
    <!-- Avatar Icon -->
    <img class="h-10 w-10 rounded-full" tabindex="0" src="{photoURL}" alt="{displayName}" />

    <!-- Menu Content -->
    <ul tabindex="0" class="dropdown-content menu rounded-md bg-base-100 p-2 shadow">
      <li>
        <div>
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
