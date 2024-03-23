<script lang="ts">
	import { page } from '$app/stores';

	interface Props {
		title?: string;
		description?: string | null;
	}

	const {
		title,
		description = 'Ask questions, get answers, and share your opinion with the world.'
	}: Props = $props();

	let author = $state('Shinyhero36');
	let siteName = $state('Svote');
	let pageTitle = $derived(title ? `${siteName} | ${title}` : `${siteName} | ${description}`);
	let baseUrl = $page.url.host;

	let colorTheme = $state('#3fb9cf');
</script>

<svelte:head>
	<title>{pageTitle}</title>
	{#if description}
		<meta name="description" content={description} />
	{/if}
	<link rel="author" href={baseUrl} />
	<meta name="author" content={author} />
	<meta name="creator" content={author} />
	<meta name="theme-color" content={colorTheme} />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<link rel="icon" href="/favicon.png" />

	<!-- Facebook Meta Tags -->
	<meta property="og:title" content={pageTitle} />
	{#if description}
		<meta property="og:description" content={description} />
	{/if}
	<meta property="og:url" content={baseUrl} />
	<meta property="og:site_name" content={siteName} />
	<!-- <meta property="og:image" content="/og.png" /> -->
	<!-- <meta property="og:image:width" content="1200" /> -->
	<!-- <meta property="og:image:height" content="630" /> -->
	<meta property="og:type" content="website" />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={pageTitle} />
	{#if description}
		<meta name="twitter:description" content={description} />
	{/if}
	<!-- <meta name="twitter:image" content="/og.png"> -->
</svelte:head>
