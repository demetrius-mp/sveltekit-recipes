<script lang="ts">
	export let isLoading: boolean = false;

	let className: string = 'btn btn-primary';
	export { className as class };
	export let sm: boolean = false;
</script>

<button disabled={isLoading} class={className}>
	{#if isLoading}
		<div class:spinner-border-sm={sm} class="spinner-border" role="status">
			<span class="visually-hidden">Loading...</span>
		</div>
	{:else}
		<slot />
	{/if}
</button>
