<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	import LoadingButton from './LoadingButton.svelte';
	import { toastStore } from './Toast';

	interface EventProps {
		signup: void;
	}

	const dispatch = createEventDispatcher<EventProps>();

	type FormProps = {
		name: string;
		email: string;
		password: string;
		passwordConfirmation: string;
	};

	const { form, isSubmitting, handleSubmit, errors } = createForm<FormProps>({
		initialValues: {
			name: '',
			email: '',
			password: '',
			passwordConfirmation: ''
		},
		validationSchema: yup.object({
			name: yup.string().required(),
			email: yup.string().email().required(),
			password: yup.string().min(8).required(),
			passwordConfirmation: yup
				.string()
				.oneOf([yup.ref('password'), null], 'Passwords must match')
				.required()
		}),
		onSubmit: async (values) => {
			const response = await fetch('/api/sign-up', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name: values.name,
					email: values.email,
					password: values.password
				})
			});

			if (response.ok) {
				toastStore.addToast({
					body: 'You have been signed up successfully.',
					removeAfter: 3000,
					title: 'Success',
					color: 'success'
				});
				dispatch('signup');
			} else {
				const error = (await response.json()) as { error: string };
				if (error.error === 'This email is already being used.') {
					$errors.email = error.error;
				}
			}
		}
	});
</script>

<form on:submit={handleSubmit}>
	<div class="mb-3">
		<label for="name" class="form-label">Name</label>
		<input
			bind:value={$form.name}
			class:is-invalid={$errors.name}
			required
			class="form-control form-control-lg"
			type="text"
			name="name"
			placeholder="John Doe"
		/>
		{#if $errors.name}
			<div class="invalid-feedback">{$errors.name}</div>
		{/if}
	</div>
	<div class="mb-3">
		<label for="email" class="form-label">Email</label>
		<input
			bind:value={$form.email}
			class:is-invalid={$errors.email}
			required
			class="form-control form-control-lg"
			type="email"
			name="email"
			placeholder="your@mail.com"
		/>
		{#if $errors.email}
			<div class="invalid-feedback">{$errors.email}</div>
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
			<div class="invalid-feedback">{$errors.password}</div>
		{/if}
	</div>
	<div class="mb-3">
		<label for="confirmPassword" class="form-label">Confirm password</label>
		<input
			bind:value={$form.passwordConfirmation}
			class:is-invalid={$errors.passwordConfirmation}
			class="form-control form-control-lg"
			type="password"
			name="confirmPassword"
			placeholder="********"
			required
		/>
		{#if $errors.passwordConfirmation}
			<div class="invalid-feedback">{$errors.passwordConfirmation}</div>
		{/if}
	</div>
	<LoadingButton class="d-block w-100 mt-3 mb-2 btn btn-primary btn-lg" isLoading={$isSubmitting}>
		Sign Up
	</LoadingButton>
	<small class="text-muted">By clicking Sign Up, you agree to the terms of use.</small>
</form>
