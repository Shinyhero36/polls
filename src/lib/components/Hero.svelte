<script lang="ts">
	import Button from '$lib/components/Button.svelte';
</script>

<div class="hero-container">
	<div class="hero-section">
		<h1>Welcome to Svote</h1>
		<p>Ask questions, get answers, and share your opinion with the world.</p>

		<Button href="/new-poll" size="lg">Create a poll</Button>
	</div>
</div>

<style lang="scss">
	.hero-container {
		position: relative;
		margin: var(--space-6xl) 0;
		padding: var(--space-12xl) 0;

		@media screen and (min-width: 768px) {
			padding: var(--space-9xl) 0;
		}

		&::before {
			position: absolute;
			content: '';
			height: 130%;
			width: 100%;
			background:
				url('./noise.webp') repeat,
				linear-gradient(83.21deg, var(--neutral-6), var(--primary-6));
			mask-image: radial-gradient(rgba(0, 0, 0, 0.5), transparent 70%);
			z-index: -1;
			opacity: 0.5;
		}
	}

	.hero-section {
		width: 100%;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-3xl);

		h1 {
			font-size: var(--font-size-7xl);
			line-height: 1;

			@media (max-width: 768px) {
				font-size: var(--font-size-5xl);
			}
		}

		p {
			font-size: var(--font-size-xl);
			line-height: var(--line-height-xl);
			color: var(--fg-app-subtle);
		}
	}
</style>
