<script>
	import Hero from '$lib/components/Hero.svelte';
	import PollCard from '$lib/components/PollCard.svelte';

	export let data;
	let { ongoing, finished } = data;
</script>

<Hero />

<section>
	<h3>Ongoing polls</h3>

	<div class="polls-grid">
		{#each ongoing as poll}
			<a href="/poll/{poll.id}">
				<PollCard {poll} />
			</a>
		{/each}
	</div>
</section>

<section>
	<h3>Past polls</h3>
	<div class="polls-grid">
		{#each finished as poll}
			<a href="/polls/{poll.id}">
				<PollCard {poll} />
			</a>
		{/each}
	</div>
</section>

<style lang="scss">
	h3 {
		margin-top: var(--space-6xl);
		margin-bottom: var(--space-4xl);
	}

	.polls-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: var(--space-2xl);

		@media screen and (max-width: 1024px) {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		@media screen and (max-width: 768px) {
			grid-template-columns: repeat(1, minmax(0, 1fr));
		}

		// anchor surrounding the poll card
		a {
			text-decoration: none;
			color: inherit;
		}
	}
</style>
