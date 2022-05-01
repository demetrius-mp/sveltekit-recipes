<script lang="ts">
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

	async function runAction(action: Action) {
		await action.execute();
		if (action.closeToastOnClick) {
			toastStore.removeToast(id);
		}
	}

	if (removeAfter !== 'never') {
		toastStore.removeToastAfter({
			id,
			milliseconds: removeAfter
		});
	}
</script>

<div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
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
			on:click={() => toastStore.removeToast(id)}
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
