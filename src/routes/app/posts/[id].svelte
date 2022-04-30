<script lang="ts" context="module">
	import postStore from '$lib/stores/post.store';
	import type { Post } from '$lib/types';
	import type { Load } from '@sveltejs/kit';
	import { sanitize } from 'isomorphic-dompurify';
	import { marked } from 'marked';

	export const load: Load = async ({ params }) => {
		const id = parseInt(params.id, 10);

		const post = await postStore.loadById(id);

		if (post === undefined) {
			return {
				status: 302,
				redirect: '/app/posts'
			};
		}

		return {
			props: {
				post
			}
		};
	};
</script>

<script lang="ts">
	export let post: Post;

	const sanitizedContent = sanitize(post.body);
</script>

<div class="container mt-3">
	<h1 class="display-3">{post.title}</h1>
	<p class="lead m-0">{post.description}</p>
	<hr />
	{@html marked.parse(sanitizedContent)}
	<hr />
	<div class="d-flex gap-2">
		{#each post.tags as tag}
			<div>
				<span class="badge bg-primary badge-size">{tag}</span>
			</div>
		{/each}
	</div>
</div>

<style>
	.badge-size {
		font-size: 0.9rem;
	}
</style>
