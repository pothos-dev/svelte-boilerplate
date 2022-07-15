<AppContainer>
  <slot />
</AppContainer>

<script>
import AppContainer from '~/components/AppContainer.svelte'

// This import enables icons via `<span class="iconify" data-icon="icon-name"/>`
import Iconify from '@iconify/iconify'
import '../app.css'
</script>
