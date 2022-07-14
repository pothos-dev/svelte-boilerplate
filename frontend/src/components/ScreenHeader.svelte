<script>
import AuthAvatar from '~/features/Authentication/components/AuthAvatar.svelte'
import AuthButton from '~/features/Authentication/components/AuthButton.svelte'
</script>

<div class="flex flex-row items-center justify-between bg-primary p-2">
  <div>
    <!-- Left -->
    <h1>MyAwesomeApp</h1>
  </div>

  <div>
    <!-- Right -->
    <AuthButton />
    <AuthAvatar />
  </div>
</div>
