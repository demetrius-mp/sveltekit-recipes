<script lang="ts">
	import { fade } from 'svelte/transition';

	export let isOpen: boolean = false;
	export let closeOnOutsideClick: boolean = true;
	export let closeOnEscClick: boolean = true;

	function handleKeyboard(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			isOpen = false;
		}
	}

	function handleOnOpen() {
		document.body.classList.add('modal-open');
		if (closeOnEscClick) {
			document.addEventListener('keydown', handleKeyboard);
		}
	}

	function handleOnClose() {
		document.body.classList.remove('modal-open');
		if (closeOnEscClick) {
			document.removeEventListener('keydown', handleKeyboard);
		}
	}

	function handleOutClick() {
		if (closeOnOutsideClick) {
			isOpen = false;
		}
	}
</script>

{#if isOpen}
	<div
		class="modal show"
		tabindex="-1"
		role="dialog"
		aria-modal="true"
		on:click|self|stopPropagation={handleOutClick}
		on:introend={handleOnOpen}
		on:outroend={handleOnClose}
		transition:fade
	>
		<slot />
	</div>
	<div class="modal-backdrop show" transition:fade={{ duration: 150 }} />
{/if}

<style>
	.modal {
		display: block;
	}
</style>
