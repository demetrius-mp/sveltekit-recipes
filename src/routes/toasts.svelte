<script lang="ts">
	import { toastStore } from '$lib/components/Toast';

	function handlePushToastWithActions() {
		toastStore.addToast({
			title: 'Hello',
			body: 'This is a toast',
			color: 'danger',
			removeAfter: 'never',
			actions: [
				{
					color: 'primary',
					execute: () => alert('The toast will be closed automatically'),
					label: 'Action 1',
					closeToastOnClick: true
				},
				{
					color: 'secondary',
					execute: () => alert("This won't close the toast automatically"),
					label: 'Secondary action'
				}
			]
		});
	}

	function handlePushBasicToast() {
		toastStore.addToast({
			title: 'Hello',
			body: 'This is a toast',
			color: 'success',
			removeAfter: 3000
		});
	}

	function handlePushPromiseToast() {
		toastStore.addToast({
			title: 'Hello',
			body: 'This is a toast',
			color: 'warning',
			removeAfter: 3000,
			promise: {
				label: 'Awaiting promise...',
				resolve: async () => await new Promise((resolve) => setTimeout(resolve, 3000))
			}
		});
	}
</script>

<div class="container mt-3 d-flex justify-content-center flex-column gap-3">
	<button on:click={handlePushToastWithActions} class="btn btn-primary w-100">
		Push toast with actions.
	</button>
	<button on:click={handlePushBasicToast} class="btn btn-primary w-100">
		Push basic toast, removed after 3 seconds.
	</button>
	<button on:click={handlePushPromiseToast} class="btn btn-primary w-100">
		Push promise toast.
	</button>
</div>
