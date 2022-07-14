<script>
import LoginButton from '~/features/Authentication/components/LoginButton.svelte'
import UserMenu from '~/features/Authentication/components/UserMenu.svelte'
</script>

<div class="flex flex-row items-center justify-between bg-primary p-2">
  <div>
    <!-- Left -->
    <h1>MyAwesomeApp</h1>
  </div>

  <div>
    <!-- Right -->
    <LoginButton />
    <UserMenu />
  </div>
</div>
