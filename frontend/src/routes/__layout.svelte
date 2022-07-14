<script>
import ScreenContainer from '~/components/ScreenContainer.svelte'
import ScreenHeader from '~/components/ScreenHeader.svelte'

import '../app.css'
</script>

<ScreenContainer>
  <ScreenHeader />
  <slot />
</ScreenContainer>
