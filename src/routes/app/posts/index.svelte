<script lang="ts" context="module">
	import Paginator from '$lib/components/Paginator';
	import type { HandlePageChange } from '$lib/components/Paginator/Paginator.svelte';
	import type { Post } from '$lib/types';
	import { formatDate } from '$lib/utils/formatter.utils';
	import type { Load } from '@sveltejs/kit';
	import { getPosts } from './_api';

	export const load: Load = async () => {
		const { posts, pageSize, totalItems } = await getPosts({
			page: 1
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
		const { posts: pagedPosts } = await getPosts({
			page: currentPage
		});

		posts = pagedPosts;
	};
</script>

<div class="container mt-3">
	<h1 class="lead fs-1 text-center">Posts</h1>
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
	<div class="mt-3 d-flex justify-content-end">
		<Paginator {totalItems} {currentPage} {pageSize} on:pagechange={handlePageChange} />
	</div>
</div>
