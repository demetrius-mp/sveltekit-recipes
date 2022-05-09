<script lang="ts">
	import { session } from '$app/stores';
	import { ToastContainer, toastStore } from '$lib/components/Toast';
	import 'bootstrap-icons/font/bootstrap-icons.css';
	import 'bootstrap/dist/css/bootstrap.min.css';

	if ($session.flashMessages) {
		$session.flashMessages.forEach((toast) => {
			toastStore.push(toast);
		});
	}
</script>

<svelte:head>
	<title>SvelteKit App</title>
</svelte:head>

<ToastContainer />
<slot />
