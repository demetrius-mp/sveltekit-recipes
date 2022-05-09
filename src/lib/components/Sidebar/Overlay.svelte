<script lang="ts">
	import { sidebarStore } from './sidebar.store';
</script>

<div on:click={sidebarStore.toggle} class:svelte-sidebar__overlay={$sidebarStore} />
