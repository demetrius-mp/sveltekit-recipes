<script lang="ts" context="module">
	import Paginator from '$lib/components/Paginator';
	import type { HandlePageChange } from '$lib/components/Paginator/Paginator.svelte';
	import PostCard from '$lib/components/PostCard.svelte';
	import postStore from '$lib/stores/post.store';
	import type { Post } from '$lib/types';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async () => {
		const { posts, pageSize, totalItems } = await postStore.load({
			pageNumber: 1
		});

		return {
			props: {
				posts,
				pageSize,
				totalItems
			}
		};
	};
</script>

<script lang="ts">
	export let posts: Post[];
	export let pageSize: number;
	export let totalItems: number;

	let currentPage: number = 1;
	const handlePageChange: HandlePageChange = async (e) => {
		currentPage = e.detail;
		loadPosts(currentPage);
	};

	let isLoading: boolean = false;
	async function loadPosts(pageNumber: number) {
		isLoading = true;
		await postStore.load({
			pageNumber
		});

		posts = $postStore;
		isLoading = false;
	}
</script>

<div class="container mt-3">
	<div class="d-flex justify-content-between">
		<div>
			<h1 class="lead fs-1 text-center">Posts</h1>
		</div>
		<div>
			<a class="btn btn-primary" href="/app/posts/new"> New Post </a>
		</div>
	</div>
	{#if isLoading}
		<div class="text-center" style="margin-top: 50px;">
			<div class="spinner-border spinner-size" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
		</div>
	{:else}
		<div class="row row-cols-1 g-3 row-cols-md-2">
			{#each posts as post}
				<div class="col">
					<PostCard {...post} />
				</div>
			{/each}
		</div>
	{/if}
	<div class="mt-4 d-flex justify-content-end">
		<Paginator {totalItems} {currentPage} {pageSize} on:pagechange={handlePageChange} />
	</div>
</div>

<style>
	.spinner-size {
		width: 3rem;
		height: 3rem;
	}
</style>
