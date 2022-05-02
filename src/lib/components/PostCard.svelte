<script lang="ts">
	import type { Post as PostProps } from '$lib/types';
	import { formatDate } from '$lib/utils/formatter.utils';

	export let id: PostProps['id'];
	export let title: PostProps['title'];
	export let description: PostProps['description'];
	export let tags: PostProps['tags'];
	export let createdAt: PostProps['createdAt'];

	function truncateDescription(description: string) {
		return description.length > 100 ? description.substring(0, 100) + '...' : description;
	}
</script>

<div class="card shadow">
	<div class="card-header d-flex justify-content-between">
		<div class="text-truncate">
			{title}
		</div>
		<div>
			<span class="text-muted small">
				{formatDate(createdAt)}
			</span>
		</div>
	</div>
	<div class="card-body">
		<div class="d-flex gap-1 mb-2">
			{#each tags as tag}
				<span class="badge rounded-pill bg-secondary">
					#{tag}
				</span>
			{/each}
		</div>
		<a href="/app/posts/{id}" class="text-decoration-none text-black stretched-link">
			{truncateDescription(description)}
		</a>
	</div>
</div>
