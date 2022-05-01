<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Icon from './Icon.svelte';
	import type { Action, Color } from './types';

	export let title: string;
	export let body: string;
	export let additionalInfo: string = '';
	export let color: Color = 'primary';
	export let actions: Action[] = [];

	type EventType = {
		close: void;
	};

	const dispatch = createEventDispatcher<EventType>();

	function dispatchClose() {
		dispatch('close');
	}

	async function runAction(action: Action) {
		await action.execute();
		if (action.closeToastOnClick) {
			dispatchClose();
		}
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
	<div class="toast-body">
		{body}
		{#if actions && actions.length}
			<div class="mt-2 pt-2 border-top d-flex gap-1">
				{#each actions as action}
					<button
						on:click={() => runAction(action)}
						type="button"
						class="btn btn-{action.color} btn-sm"
					>
						{action.label}
					</button>
				{/each}
			</div>
		{/if}
	</div>
</div>
