<script lang="ts">
	import { session } from '$app/stores';
</script>

<h1>Welcome to the app, {$session.user?.name}</h1>
