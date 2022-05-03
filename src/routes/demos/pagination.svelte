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
		query,
		field
	}: {
		pageNumber: number;
		query?: string;
		field?: keyof Item;
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

		if (query && field) {
			if (field === 'id') {
				const filteredItems = items.filter((item) => item[field] === parseInt(query, 10));
				return {
					items: filteredItems.slice(start, end),
					pageSize: PAGE_SIZE,
					totalItems: filteredItems.length
				};
			}

			const filteredItems = items.filter((item) => item[field].includes(query));
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
		field: keyof Item;
	};

	const { handleSubmit, form, isSubmitting } = createForm<FormProps>({
		initialValues: {
			query: '',
			field: 'info'
		},
		onSubmit: async ({ query, field }) => {
			currentPage = 1;
			await loadItems({
				pageNumber: currentPage,
				query,
				field
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
	async function loadItems({
		pageNumber,
		query,
		field
	}: {
		pageNumber: number;
		query?: string;
		field?: keyof Item;
	}) {
		isLoading = true;

		const response = await mockLoadItemsAsync({
			pageNumber,
			query,
			field
		});
		items = response.items;
		pageSize = response.pageSize;
		totalItems = response.totalItems;

		isLoading = false;
	}

	$: start = (currentPage - 1) * pageSize + 1;
	$: end = start + pageSize - 1;
</script>

<div class="container mt-3">
	<div class="d-flex gap-3 flex-sm-row flex-column justify-content-between align-items-center">
		<div>
			<h1 class="lead fs-2 m-0 text-center">Items</h1>
		</div>
		<div class="w-100">
			<form on:submit={handleSubmit} class="input-group">
				<select bind:value={$form.field} class="form-select" style="max-width: fit-content;">
					<option value="id">ID</option>
					<option value="info">Info</option>
				</select>
				<input bind:value={$form.query} type="search" class="form-control" placeholder="Search" />
				<LoadingButton sm class="btn btn-outline-secondary" isLoading={$isSubmitting}>
					<i class="bi bi-search" />
				</LoadingButton>
			</form>
		</div>
	</div>
	<div class="mt-3">
		<ul class="nav nav-tabs">
			<li class="nav-item">
				<span class="nav-link active" aria-current="page">List</span>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="/app/posts/new">Create</a>
			</li>
		</ul>
	</div>
	<div class="mt-1">
		<span class="small text-muted">
			Showing records {start} to {end} out of {totalItems}.
		</span>
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
</style>
