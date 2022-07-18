<AppContainer>
  <slot />
</AppContainer>

<script>
  // Imports global css
  import "../app.css"

  // This import enables icons via `<span class="iconify" data-icon="icon-name"/>`
  import "@iconify/iconify"

  import AppContainer from "~/components/app/AppContainer.svelte"
</script>
