<script lang="ts">
	import type { Color } from './types';

	export let color: Color = 'primary';
	export let size: number = 20;
</script>

<svg
	class={`rounded text-${color} me-2`}
	width={size}
	height={size}
	xmlns="http://www.w3.org/2000/svg"
	preserveAspectRatio="xMidYMid slice"
	focusable="false"
	role="img"
>
	<rect fill="currentColor" width="100%" height="100%" />
</svg>
