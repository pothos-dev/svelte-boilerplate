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
        <a href="/profile">
          <span class="iconify" data-icon="material-symbols:person-outline"></span>
          Profile
        </a>
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

<script lang="ts">
  import { currentUser, logout } from "~/lib/firebase/auth"
</script>
