<script lang="ts">
	import { sidebarStore } from './sidebar.store';
</script>

<div class:active={$sidebarStore} class="svelte-sidebar__content">
	<slot />
</div>
