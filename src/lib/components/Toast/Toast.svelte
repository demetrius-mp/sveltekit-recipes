<script lang="ts">
	import { fade } from 'svelte/transition';
	import Icon from './Icon.svelte';
	import toastStore from './toast.store';
	import type { Action, Toast as ToastProps } from './types';

	export let id: ToastProps['id'];
	export let title: ToastProps['title'];
	export let body: ToastProps['body'];
	export let additionalInfo: ToastProps['additionalInfo'] = '';
	export let color: ToastProps['color'] = 'primary';
	export let removeAfter: ToastProps['removeAfter'] = 'never';
	export let actions: ToastProps['actions'] = [];
	export let promise: ToastProps['promise'] = undefined;

	async function runAction(action: Action) {
		await action.execute();
		if (action.closeToastOnClick) {
			toastStore.close(id);
		}
	}

	if (!promise && removeAfter !== 'never') {
		toastStore.closeAfter({
			id,
			milliseconds: removeAfter
		});
	}

	async function awaitToastPromise() {
		if (promise) {
			await promise.resolve();

			if (removeAfter !== 'never') {
				toastStore.closeAfter({
					id,
					milliseconds: removeAfter
				});
			}
		}
	}
</script>

{#await awaitToastPromise()}
	<div
		in:fade
		class="toast show align-items-center"
		role="alert"
		aria-live="assertive"
		aria-atomic="true"
	>
		<div class="toast-body d-flex gap-2 align-items-center">
			<div>
				<div class="spinner-border text-secondary spinner-border-sm" role="status">
					<span class="visually-hidden">Loading...</span>
				</div>
			</div>
			<div>{promise?.label}</div>
		</div>
	</div>
{:then _}
	<div in:fade class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
		<div class="toast-header">
			<Icon {color} />
			<strong class="me-auto">{title}</strong>
			{#if additionalInfo}
				<small>{additionalInfo}</small>
			{/if}
			<button
				type="button"
				class="btn-close"
				aria-label="Close"
				on:click={() => toastStore.close(id)}
			/>
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
{/await}
