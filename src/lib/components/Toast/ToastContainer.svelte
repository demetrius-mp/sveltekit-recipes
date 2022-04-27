<script lang="ts">
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';
	import toastStore from './toast.store';
	import Toast from './Toast.svelte';

	const positionClass = {
		'top-left': 'top-0 start-0',
		'top-center': 'top-0 start-50 translate-middle-x',
		'top-right': 'top-0 end-0',
		'middle-left': 'top-50 start-0 translate-middle-y',
		'middle-center': 'top-50 start-50 translate-middle',
		'middle-right': 'top-50 end-0 translate-middle-y',
		'bottom-left': 'bottom-0 start-0',
		'bottom-center': 'bottom-0 start-50 translate-middle-x',
		'bottom-right': 'bottom-0 end-0'
	};
	type Position = keyof typeof positionClass;
	export let position: Position = 'top-right';
</script>

{#if $toastStore.length}
	<div
		style="z-index: 10;"
		class="toast-container position-absolute {positionClass[position]} margins"
	>
		{#each $toastStore as toast (toast.id)}
			<div animate:flip transition:fade>
				<Toast
					on:close={() => toastStore.removeToast(toast.id)}
					title={toast.title}
					body={toast.body}
					additionalInfo={toast.additionalInfo}
					color={toast.color}
				/>
			</div>
		{/each}
	</div>
{/if}

<style>
	.margins {
		--margin: calc(0.5rem + 7px);
		margin-top: var(--margin);
		margin-bottom: var(--margin);
		margin-left: var(--margin);
		margin-right: var(--margin);
	}
</style>
