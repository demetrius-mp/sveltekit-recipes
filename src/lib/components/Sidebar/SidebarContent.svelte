<script lang="ts">
	import { onMount } from 'svelte';
	import { getScrollBarWidth, onOverflowChange } from './utils';

	export let scrollable: boolean = false;
	export let paddingRight: string = '1rem';

	let overflowed: boolean = false;
	let element: HTMLDivElement;
	let scrollbarWidth: number;

	onMount(() => {
		if (scrollable) {
			scrollbarWidth = getScrollBarWidth();

			const removeListener = onOverflowChange(element, (isOverflowing) => {
				overflowed = isOverflowing;
				console.log(scrollbarWidth);
			});

			return removeListener;
		}
	});
</script>

<div
	class:scrollarea={scrollable}
	bind:this={element}
	style="--padding-right: {paddingRight}; --scrollbar-width: {scrollbarWidth}px;"
	class="padding"
	class:overflowed
>
	<slot />
</div>

<style>
	.padding {
		padding-right: var(--padding-right);
	}
	.overflowed {
		padding-right: calc(var(--padding-right) - var(--scrollbar-width));
	}
	.scrollarea {
		overflow-y: auto;
	}
</style>
