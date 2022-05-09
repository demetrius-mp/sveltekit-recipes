<script lang="ts">
	import {
		AppContent,
		AppWrapper,
		Sidebar,
		SidebarContent,
		sidebarStore
	} from '$lib/components/Sidebar';
	import '$lib/components/Sidebar/sidebar.css';
	import './../../app.css';

	let items = [
		{
			id: 1,
			name: 'Item 1'
		},
		{
			id: 2,
			name: 'Item 2'
		},
		{
			id: 3,
			name: 'Item 3'
		}
	];

	function addItem() {
		const id = items.length + 1;

		items = [...items, { id, name: `Item ${id}` }];
	}

	let currentItemId = 1;
</script>

<AppWrapper>
	<Sidebar>
		<div class="p-2 d-flex align-items-center justify-content-between">
			<span class="fs-4">Sidebar</span>
			<button class="btn-close" on:click={sidebarStore.hide} />
		</div>
		<hr class="m-0 mx-2" />
		<div class="p-2">
			<button on:click={addItem} class="btn btn-primary w-100"> Add item </button>
		</div>
		<SidebarContent scrollable paddingRight="0.5rem">
			<ul class="ps-2 nav flex-column nav-pills gap-2">
				{#each items as item}
					<li class="nav-item">
						<!-- svelte-ignore a11y-missing-attribute -->
						<a
							on:click={() => (currentItemId = item.id)}
							class:active={item.id === currentItemId}
							class="nav-link cursor-pointer"
							aria-current="page"
						>
							{item.name}
						</a>
					</li>
				{/each}
			</ul>
		</SidebarContent>
	</Sidebar>
	<AppContent>
		<div class="container">
			<button class="btn btn-primary" on:click={sidebarStore.toggle}>Toggle sidebar</button>
			<h1>Teste</h1>
		</div>
	</AppContent>
</AppWrapper>

<style>
	.cursor-pointer {
		cursor: pointer;
	}
</style>
