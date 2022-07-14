<script>
import ScreenHeader from './ScreenHeader.svelte'
</script>

<div data-theme="dark" class="h-screen">
  <ScreenHeader />
  <div class="px-2 py-4">
    <slot />
  </div>
</div>
