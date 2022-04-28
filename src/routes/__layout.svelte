<script lang="ts">
	import { goto } from '$app/navigation';
	import { session } from '$app/stores';
	import { Navbar } from '$lib/components/layout';
	import { ToastContainer, toastStore } from '$lib/components/Toast';
	import userStore from '$lib/stores/user.store';
	import 'bootstrap-icons/font/bootstrap-icons.css';
	import 'bootstrap/dist/css/bootstrap.min.css';

	if ($session.flashMessages) {
		$session.flashMessages.forEach((toast) => {
			toastStore.addToast(toast);
		});
	}

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

<ToastContainer />
<Navbar />
<slot />
