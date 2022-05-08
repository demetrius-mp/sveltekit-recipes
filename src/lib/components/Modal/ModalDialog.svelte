<script lang="ts">
	import { quintOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	let className: string = '';
	export { className as class };

	$: classes = `modal-dialog ${className}`;
</script>

<div
	class={classes}
	role="document"
	in:fly={{ y: -50, duration: 300 }}
	out:fly={{ y: -50, duration: 300, easing: quintOut }}
>
	<div class="modal-content">
		<slot />
	</div>
</div>
