Hello {name}

<script lang="ts">
  import { session } from "$app/stores"

  let name = $session.user?.email ?? "Guest"
</script>
