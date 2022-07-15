<script>
import LoginButton from '~/features/Authentication/components/LoginButton.svelte'
import UserMenu from '~/features/Authentication/components/UserMenu.svelte'
</script>

<div class="flex h-14 flex-row items-center bg-primary px-2">
  <h1>MyAwesomeApp</h1>

  <div class="flex-1"></div>

  <LoginButton />
  <UserMenu />
</div>
