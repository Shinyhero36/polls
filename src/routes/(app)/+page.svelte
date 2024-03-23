<script lang="ts">
	import Button from '$lib/components/ui/Button/Button.svelte';
	import EmptyState from '$lib/components/EmptyState.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import PollCard from '$lib/components/PollCard.svelte';
	import type { PollOptionWithVotes } from '$lib/types';

	export let data;
	let { ongoing, finished } = data;

	const countVotes = (options: PollOptionWithVotes[]) => {
		return options.reduce((acc, option) => acc + option.votes.length, 0);
	};
</script>

<Hero />

<section aria-label="Ongoing polls">
	<h3>Ongoing polls</h3>

	{#if ongoing.length === 0}
		<EmptyState message="No polls" />
	{:else}
		<div class="polls-grid">
			{#each ongoing as poll}
				<a href="/poll/{poll.id}">
					<PollCard {poll} totalOfVotes={countVotes(poll.options)} />
				</a>
			{/each}
		</div>
	{/if}
</section>

<section aria-label="Past polls">
	<h3>Past polls</h3>
	{#if finished.length === 0}
		<EmptyState message="No polls" extra="Create a poll to get started">
			<Button href="/create" variant="primary">Create a poll</Button>
		</EmptyState>
	{:else}
		<div class="polls-grid">
			{#each finished as poll}
				<a href="/poll/{poll.id}">
					<PollCard {poll} totalOfVotes={countVotes(poll.options)} />
				</a>
			{/each}
		</div>
	{/if}
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
