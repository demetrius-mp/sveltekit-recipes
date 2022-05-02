<script lang="ts" context="module">
	import Paginator from '$lib/components/Paginator';
	import type { HandlePageChange } from '$lib/components/Paginator/Paginator.svelte';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async () => {
		const { items, pageSize, totalItems } = await mockLoadItemsAsync(1);

		return {
			props: {
				items,
				pageSize,
				totalItems
			}
		};
	};

	// the return type of a function that loads more items must follow this type
	type PagedItemList<T = any> = {
		items: T[];
		pageSize: number;
		totalItems: number;
	};

	type Item = {
		id: number;
		info: string;
	};

	async function mockLoadItemsAsync(pageNumber: number): Promise<PagedItemList<Item>> {
		await new Promise((resolve) => setTimeout(resolve, 1000));
		const PAGE_SIZE = 5;
		const TOTAL_ITEMS = 100;

		const items: Item[] = [];
		for (let index = 1; index <= PAGE_SIZE; index++) {
			const currentId = (pageNumber - 1) * PAGE_SIZE + index;
			const item: Item = {
				id: currentId,
				info: `Item ${index}`
			};

			items.push(item);
		}

		return {
			items,
			pageSize: PAGE_SIZE,
			totalItems: TOTAL_ITEMS
		};
	}
</script>

<script lang="ts">
	export let items: Item[];
	export let pageSize: number;
	export let totalItems: number;

	let currentPage: number = 1;
	const handlePageChange: HandlePageChange = async (e) => {
		currentPage = e.detail;
		loadItems(currentPage);
	};

	let isLoading: boolean = false;
	async function loadItems(pageNumber: number) {
		isLoading = true;
		items = (await mockLoadItemsAsync(pageNumber)).items;
		isLoading = false;
	}
</script>

<div class="container mt-3">
	<div class="d-flex justify-content-between">
		<div>
			<h1 class="lead fs-1 text-center">Items</h1>
		</div>
		<div>
			<a class="btn btn-primary" href="/app/posts/new"> New Item </a>
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
			{#each items as item}
				<div class="col text-center">
					<h1>{item.id}</h1>
					<p>{item.info}</p>
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
