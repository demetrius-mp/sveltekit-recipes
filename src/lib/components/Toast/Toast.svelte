<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Icon from './Icon.svelte';
	import type { Color } from './types';

	export let title: string;
	export let body: string;
	export let additionalInfo: string = '';
	export let color: Color = 'primary';

	type EventType = {
		close: void;
	};

	const dispatch = createEventDispatcher<EventType>();

	function dispatchClose() {
		dispatch('close');
	}
</script>

<div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
	<div class="toast-header">
		<Icon {color} />
		<strong class="me-auto">{title}</strong>
		{#if additionalInfo}
			<small>{additionalInfo}</small>
		{/if}
		<button type="button" class="btn-close" aria-label="Close" on:click={dispatchClose} />
	</div>
	<div class="toast-body">{body}</div>
</div>
