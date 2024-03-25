<script lang="ts">
	import { Toaster } from 'svelte-sonner';

	import '../styles/globals.scss';
	import Meta from '$lib/components/Meta.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<Meta />

<Toaster />

<slot />

<Footer />
