<script lang="ts">
	import { goto } from '$app/navigation';
	import SignInForm from '$lib/components/SignInForm.svelte';
	import SignUpForm from '$lib/components/SignUpForm.svelte';

	let currentForm: 'sign-in' | 'sign-up' = 'sign-in';

	const toggleForm = () => {
		currentForm = currentForm === 'sign-in' ? 'sign-up' : 'sign-in';
	};

	async function goHome() {
		await goto('/');
	}
</script>

<svelte:head>
	<title>Sign Up!</title>
</svelte:head>

<div class="container">
	<div class="d-flex vh-100 align-items-center justify-content-center">
		<div class="shadow p-3 card" style="border-radius: 0.75rem; max-width: 400px;">
			<div class="card-body">
				<div class="mb-3">
					<h2 class="fw-bold">Let's get started</h2>
					<small class="text-muted">
						{#if currentForm === 'sign-in'}
							Don't have an account?
						{/if}
						{#if currentForm === 'sign-up'}
							Already have an account?
						{/if}
						<!-- svelte-ignore a11y-missing-attribute -->
						<a
							on:click|preventDefault={toggleForm}
							class="text-muted cursor-pointer text-decoration-underline"
							href="#/"
						>
							{#if currentForm === 'sign-in'}
								Sign up
							{/if}
							{#if currentForm === 'sign-up'}
								Sign in
							{/if}
						</a>
					</small>
				</div>
				{#if currentForm === 'sign-in'}
					<SignInForm on:signin={goHome} />
				{:else if currentForm === 'sign-up'}
					<SignUpForm on:signup={toggleForm} />
				{/if}
			</div>
		</div>
	</div>
</div>
