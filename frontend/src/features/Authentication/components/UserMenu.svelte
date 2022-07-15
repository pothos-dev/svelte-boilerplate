<script lang="ts">
import { currentUser } from '~/features/Authentication/states'
</script>

{#if $currentUser}
  {@const { photoURL, displayName } = $currentUser}

  <!-- Menu Container -->
  <div class="dropdown-end dropdown dropdown-open">
    <!-- Avatar Icon -->
    <img class="h-10 w-10 rounded-full" tabindex="0" src="{photoURL}" alt="{displayName}" />

    <!-- Menu Content -->
    <ul tabindex="0" class="dropdown-content menu gap-2 rounded-md bg-base-100 p-2 shadow">
      <!-- <li>Profile</li> -->

      <li class="light-blue-block">
        <!-- <button class="btn gap-2"> -->
          <span class="iconify" data-icon="material-symbols:logout"></span>
          Logout
        <!-- </button> -->
      </li>
    </ul>
  </div>
{/if}


<style>
  .light-blue-block .iconify {
   color: #08f;
}
</style>