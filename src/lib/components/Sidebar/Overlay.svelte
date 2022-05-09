<script lang="ts">
	import { fade, type FadeParams } from 'svelte/transition';
	import { sidebarStore } from './sidebar.store';

	const fadeParams: FadeParams = {
		duration: 150
	};
</script>

{#if $sidebarStore}
	<div
		transition:fade={fadeParams}
		on:click={sidebarStore.toggle}
		class="svelte-sidebar__overlay"
	/>
{/if}
