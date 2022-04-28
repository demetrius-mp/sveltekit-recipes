<script lang="ts">
	import userStore from '$lib/stores/user.store';
	import { createEventDispatcher } from 'svelte';
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	import LoadingButton from './LoadingButton.svelte';
	import { toastStore } from './Toast';

	type EventProps = {
		signin: void;
	};

	const dispatch = createEventDispatcher<EventProps>();

	type FormProps = {
		email: string;
		password: string;
	};

	const { form, isSubmitting, handleSubmit, errors } = createForm<FormProps>({
		initialValues: {
			email: '',
			password: ''
		},
		validationSchema: yup.object().shape({
			email: yup.string().email().required(),
			password: yup.string().min(8).required()
		}),
		onSubmit: async (values) => {
			try {
				await userStore.signIn({ ...values });
				toastStore.addToast({
					body: 'You have been signed in successfully.',
					removeAfter: 3000,
					title: 'Success',
					color: 'success'
				});
				dispatch('signin');
			} catch (err) {
				if (err instanceof Error) {
					console.error(err);
					toastStore.addToast({
						body: err.message,
						removeAfter: 'never',
						title: 'Error',
						color: 'danger'
					});
				}
			}
		}
	});
</script>

<form on:submit={handleSubmit}>
	<div class="mb-3">
		<label for="email" class="form-label">Email</label>
		<input
			bind:value={$form.email}
			class:is-invalid={$errors.email}
			class="form-control form-control-lg"
			type="email"
			name="email"
			placeholder="your@email.com"
			required
		/>
		{#if $errors.email}
			<div class="invalid-feedback">
				{$errors.email}
			</div>
		{/if}
	</div>
	<div class="mb-3">
		<label for="password" class="form-label">Password</label>
		<input
			bind:value={$form.password}
			class:is-invalid={$errors.password}
			class="form-control form-control-lg"
			type="password"
			name="password"
			placeholder="********"
			required
		/>
		{#if $errors.password}
			<div class="invalid-feedback">
				{$errors.password}
			</div>
		{/if}
	</div>
	<LoadingButton class="d-block w-100 mt-3 mb-2 btn btn-primary btn-lg" isLoading={$isSubmitting}>
		Sign In
	</LoadingButton>
	<small class="text-muted">By clicking Sign In, you agree to the terms of use.</small>
</form>
