<script lang="ts" context="module">
	import LoadingButton from '$lib/components/LoadingButton.svelte';
	import Paginator from '$lib/components/Paginator';
	import type { HandlePageChange } from '$lib/components/Paginator/Paginator.svelte';
	import type { Load } from '@sveltejs/kit';
	import { createForm } from 'svelte-forms-lib';

	export const load: Load = async () => {
		const { items, pageSize, totalItems } = await mockLoadItemsAsync({
			pageNumber: 1
		});

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

	async function mockLoadItemsAsync({
		pageNumber,
		query
	}: {
		pageNumber: number;
		query?: string;
	}): Promise<PagedItemList<Item>> {
		await new Promise((resolve) => setTimeout(resolve, 1000));
		const PAGE_SIZE = 5;
		const TOTAL_ITEMS = 100;

		const items: Item[] = [];
		for (let index = 1; index <= TOTAL_ITEMS; index++) {
			const item: Item = {
				id: index,
				info: `Item ${index}`
			};

			items.push(item);
		}

		const start = (pageNumber - 1) * PAGE_SIZE;
		const end = start + PAGE_SIZE;

		if (query) {
			const filteredItems = items.filter((item) => item.info.includes(query));
			return {
				items: filteredItems.slice(start, end),
				pageSize: PAGE_SIZE,
				totalItems: filteredItems.length
			};
		}

		return {
			items: items.slice(start, end),
			pageSize: PAGE_SIZE,
			totalItems: TOTAL_ITEMS
		};
	}
</script>

<script lang="ts">
	export let items: Item[];
	export let pageSize: number;
	export let totalItems: number;

	type FormProps = {
		query: string;
	};

	const { handleSubmit, form, isSubmitting } = createForm<FormProps>({
		initialValues: {
			query: ''
		},
		onSubmit: async ({ query }) => {
			currentPage = 1;
			await loadItems({
				pageNumber: currentPage,
				query
			});
		}
	});

	let currentPage: number = 1;
	const handlePageChange: HandlePageChange = async (e) => {
		currentPage = e.detail;
		await loadItems({
			pageNumber: currentPage,
			query: $form.query
		});
	};

	let isLoading: boolean = false;
	async function loadItems({ pageNumber, query }: { pageNumber: number; query?: string }) {
		isLoading = true;

		const response = await mockLoadItemsAsync({
			pageNumber,
			query: query
		});
		items = response.items;
		pageSize = response.pageSize;
		totalItems = response.totalItems;

		isLoading = false;
	}
</script>

<div class="container mt-3">
	<div
		class="d-flex flex-wrap gap-3 flex-sm-row flex-column justify-content-between align-items-center"
	>
		<div>
			<h1 class="lead fs-2 m-0 text-center">Items</h1>
		</div>
		<div class="flex-fill w-sm-100">
			<form on:submit={handleSubmit} class="input-group">
				<input bind:value={$form.query} type="search" class="form-control" placeholder="Search" />
				<LoadingButton sm class="btn btn-outline-secondary" isLoading={$isSubmitting}>
					<i class="bi bi-search" />
				</LoadingButton>
			</form>
		</div>
		<div class="w-sm-100">
			<a class="btn btn-primary w-sm-100" href="/app/posts/new"> New Item </a>
		</div>
	</div>
	<div class="mt-1">
		<span class="small text-muted">Showing {pageSize} of {totalItems} total items.</span>
	</div>
	{#if isLoading}
		<div class="text-center" style="margin-top: 50px;">
			<div class="spinner-border spinner-size" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
		</div>
	{:else if items.length !== 0}
		<div class="row row-cols-1 g-3 row-cols-md-2 mt-3">
			{#each items as item}
				<div class="col text-center">
					<h1>{item.id}</h1>
					<p>{item.info}</p>
				</div>
			{/each}
		</div>
	{:else}
		<div class="text-center mt-4">
			<h1>No results found</h1>
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

	@media (max-width: 576px) {
		.w-sm-100 {
			width: 100%;
		}
	}
</style>
