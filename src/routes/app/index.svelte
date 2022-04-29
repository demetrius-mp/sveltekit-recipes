<script lang="ts">
	import { session } from '$app/stores';

	type Option = {
		path: string;
		name: string;
		icon: string;
	};

	const options: Option[] = [
		{
			name: 'Manage posts',
			icon: 'postcard',
			path: '/app/posts'
		}
	];
</script>

<div class="container mt-3">
	<h1 class="text-center lead fs-1">Welcome back, {$session.user?.name}</h1>

	<div class="mt-3">
		<div class="row row-cols-1 g-3">
			{#each options as option}
				<div class="col">
					<div
						class="card shadow p-3 d-flex flex-column justify-content-center align-items-center"
						style="border-radius: 0.5rem;"
					>
						<i class="bi bi-{option.icon}" style="font-size: 5rem;" />
						<h3 class="m-0">
							<a class="text-decoration-none text-black stretched-link" href={option.path}>
								{option.name}
							</a>
						</h3>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
