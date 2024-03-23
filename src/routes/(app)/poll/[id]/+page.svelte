<script lang="ts">
	import Countdown from '$lib/components/Countdown.svelte';
	import PollOptions from '$lib/components/PollOptions.svelte';
	import type { PollOption } from '$lib/types';
	import { page } from '$app/stores';
	import type { PageServerData } from './$types';

	let {
		poll,
		session
	}: {
		poll: PageServerData['poll'];
		session: PageServerData['session'];
	} = $state({
		poll: $page.data.poll,
		session: $page.data.session
	});

	const handleVote = async (option: PollOption) => {
		if (!poll) return;
		if (!session) return; // TODO: Should redirect to login page instead

		// Make sure the user hasn't already voted
		if (poll.options.some((o) => o.votes.some((v) => v.userId === session?.userId))) {
			console.error('User has already voted');
			return;
		}

		// Send vote to the server
		const form = new FormData();
		form.append('optionId', option.id);
		const res = await fetch(`/poll/${poll?.id}?/vote`, {
			method: 'POST',
			body: form
		});

		if (!res.ok) {
			console.error('Failed to vote');
			return;
		}

		// Update the poll with the new vote count
		poll = {
			...poll,
			options: poll.options.map((o) => {
				if (o.id === option.id && session) {
					return {
						...o,
						votes: [...o.votes, { userId: session.userId, pollOptionId: option.id }]
					};
				}
				return o;
			})
		};
	};
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
		<PollOptions bind:endsAt={poll.endsAt} bind:options={poll.options} onVote={handleVote} />
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
