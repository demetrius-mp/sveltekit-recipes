<script lang="ts" context="module">
	import type { MaybePromise } from '@sveltejs/kit/types/private';
	import { createEventDispatcher } from 'svelte';

	type PaginatorEvents = {
		pagechange: number;
	};

	export type HandlePageChange = (
		e: CustomEvent<PaginatorEvents['pagechange']>
	) => MaybePromise<void>;
</script>

<script lang="ts">
	export let totalItems: number;
	export let pageSize: number;
	export let currentPage: number = 1;

	const dispatch = createEventDispatcher<PaginatorEvents>();

	function dispatchPageChange(page: number) {
		dispatch('pagechange', page);
	}

	let pageButtons: number[];

	$: totalPages = Math.ceil(totalItems / pageSize);

	$: {
		pageButtons = [];
		for (let val = 1; val <= totalPages; ++val) {
			// Put in -1's where the ellipsis will go
			const pageNumberValue =
				Math.abs(currentPage - val) < 2 || val == 1 || val == totalPages ? val : -1;
			pageButtons.push(pageNumberValue);
		}
		// Get rid of duplicate -1s which represent an ellipsis
		pageButtons = pageButtons.filter((val, index) => pageButtons[index - 1] !== val);
	}
</script>

{#if totalPages > 1}
	<nav aria-label="Record navigation">
		<ul class="pagination">
			<li class="page-item" class:disabled={currentPage == 1}>
				<a
					class="page-link"
					href={'#'}
					on:click|preventDefault={() => dispatchPageChange(currentPage - 1)}
					aria-label="Previous"
				>
					<i class="bi bi-chevron-left" />
				</a>
			</li>
			{#each pageButtons as pageNumber}
				<li
					class="page-item"
					class:active={pageNumber == currentPage}
					class:disabled={pageNumber == -1}
				>
					<a
						class="page-link"
						href={'#'}
						aria-label="Page {pageNumber}"
						on:click|preventDefault={() => dispatchPageChange(pageNumber)}
					>
						{pageNumber !== -1 ? pageNumber : '...'}
					</a>
				</li>
			{/each}
			<li class="page-item" class:disabled={currentPage == totalPages}>
				<a
					class="page-link"
					href={'#'}
					on:click|preventDefault={() => dispatchPageChange(currentPage + 1)}
					aria-label="Next"
				>
					<i class="bi bi-chevron-right" />
				</a>
			</li>
		</ul>
	</nav>
{/if}
