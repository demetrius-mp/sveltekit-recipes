<script lang="ts" context="module">
	import Paginator from '$lib/components/Paginator';
	import type { HandlePageChange } from '$lib/components/Paginator/Paginator.svelte';
	import postStore from '$lib/stores/post.store';
	import type { Post } from '$lib/types';
	import { formatDate } from '$lib/utils/formatter.utils';
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
	let isFirstLoad: boolean = true;
	const handlePageChange: HandlePageChange = async (e) => {
		currentPage = e.detail;
		isFirstLoad = false;
	};

	let isLoading: boolean = false;
	async function loadPosts(pageNumber: number) {
		isLoading = true;
		const { posts: pagedPosts } = await postStore.load({
			pageNumber
		});

		posts = pagedPosts;
		isLoading = false;
	}

	$: {
		if (!isFirstLoad) {
			loadPosts(currentPage);
		}
	}
</script>

<div class="container mt-3">
	<div class="d-flex justify-content-between">
		<div>
			<h1 class="lead fs-1 text-center">Posts</h1>
		</div>
		<div>
			<Paginator {totalItems} {currentPage} {pageSize} on:pagechange={handlePageChange} />
		</div>
	</div>
	{#if isLoading}
		<div class="text-center" style="margin-top: 100px;">
			<div class="spinner-border spinner-size" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
		</div>
	{:else}
		<div class="row row-cols-1 g-3 row-cols-md-2">
			{#each posts as post}
				<div class="col">
					<div class="card shadow-sm">
						<div class="card-header d-flex justify-content-between">
							<div>
								{post.title}
							</div>
							<div>
								<span class="text-muted small">
									{formatDate(post.createdAt)}
								</span>
							</div>
						</div>
						<div class="card-body">
							<p class="m-0">{post.description}</p>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
	<div class="mt-3 d-flex justify-content-end" />
</div>

<style>
	.spinner-size {
		width: 3rem;
		height: 3rem;
	}
</style>
