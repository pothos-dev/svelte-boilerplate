<script lang="ts">
import { currentUser } from '~/features/Authentication/states'
</script>

{#if $currentUser}
  {@const { photoURL, displayName } = $currentUser}
  <div class="dropdown dropdown-end dropdown-hover">
    <img class="h-12 w-12 rounded-full" tabindex="0" src="{photoURL}" alt="{displayName}" />
    <ul tabindex="0" class="dropdown-content menu space-y-1 rounded-md bg-base-100 p-2 shadow">
      <li>Profile</li>
      <li>Logout</li>
    </ul>
  </div>
{/if}
