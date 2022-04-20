<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ session }) => {
		if (session.user === null) {
			return {
				redirect: '/',
				status: 302
			};
		}

		return {
			status: 200
		};
	};
</script>

<slot />
