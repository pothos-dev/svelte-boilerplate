Hello {name}

<script lang="ts">
  import { session } from "$app/stores"

  $: name = $session.user?.email ?? "Guest"
</script>
