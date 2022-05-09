<script lang="ts">
	import { sidebarStore } from './sidebar.store';
</script>

<nav class:active={$sidebarStore} class="svelte-sidebar__sidebar">
	<slot />
</nav>
