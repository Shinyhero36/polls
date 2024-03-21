<script lang="ts">
	import Header from '$lib/components/Header.svelte';
</script>

<Header />

<main class="container">
	<slot />
</main>

<style lang="scss">
	main {
		margin-bottom: var(--space-6xl);
	}
</style>
