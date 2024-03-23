<script lang="ts">
	import { Toaster } from 'svelte-sonner';

	import '../styles/globals.scss';
	import Meta from '$lib/components/Meta.svelte';
</script>

<Meta />

<Toaster />

<slot />
