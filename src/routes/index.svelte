<script lang="ts">
	import { session } from '$app/stores';
	import userStore from '$lib/stores/user.store';
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<a href="/sign-in">Sign In</a>
{#if $session.user?.name}
	<button on:click={userStore.signOut} class="btn btn-primary">Sign Out</button>
{/if}
