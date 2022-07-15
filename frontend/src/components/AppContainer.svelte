<script>
import AppHeader from './AppHeader.svelte'
</script>

<div data-theme="dark" class="h-screen overflow-hidden">
  <AppHeader />
  <div class="px-2 py-4">
    <slot />
  </div>
</div>
