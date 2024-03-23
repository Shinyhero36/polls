<script lang="ts">
	import Countdown from '$lib/components/Countdown.svelte';
	import PollOptions from '$lib/components/PollOptions.svelte';

	export let data;
	const { poll } = data;
</script>

{#if poll}
	<h1>{poll.question}</h1>
	{#if poll.description}
		<p>{poll.description}</p>
	{/if}
	<div class="time-info">
		<Countdown until={poll.endsAt} />
	</div>

	<div class="poll">
		<PollOptions endsAt={poll.endsAt} options={poll.options} />
	</div>
{/if}

<style lang="scss">
	h1 {
		margin-top: var(--space-6xl);
		font-size: var(--font-size-4xl);
	}

	p {
		margin-top: var(--space-md);
		font-size: var(--font-size-lg);
		line-height: var(--line-height-lg);
		color: var(--fg-app-subtle);
	}

	.time-info {
		margin-top: var(--space-2xl);
		display: flex;
		align-items: center;
		gap: var(--space-md);
		color: var(--fg-app-subtle);

		p {
			font-size: var(--font-size-xl);
			line-height: var(--line-height-xl);
		}
	}

	.poll {
		margin-top: var(--space-8xl);
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: var(--space-2xl);
	}
</style>
