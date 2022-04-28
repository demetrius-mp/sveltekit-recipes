<script lang="ts">
	import { goto } from '$app/navigation';
	import { session } from '$app/stores';
	import { toastStore } from '$lib/components/Toast';
	import userStore from '$lib/stores/user.store';

	async function gotoSignIn() {
		await goto('/sign-in');
	}

	async function signOut() {
		await userStore.signOut();
		toastStore.addToast({
			title: 'Success',
			body: 'Signed out successfully!',
			color: 'success',
			removeAfter: 1000
		});
		await goto('/');
	}
</script>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
	<div class="container-fluid">
		<a class="navbar-brand" href="/">Invoice Manager</a>
		<div class="navbar-nav">
			<div class="nav-item">
				{#if !$session.user}
					<button on:click={gotoSignIn} class="btn btn-outline-primary">Sign In</button>
				{:else}
					<button on:click={signOut} class="btn btn-outline-danger">Sign Out</button>
				{/if}
			</div>
		</div>
	</div>
</nav>
