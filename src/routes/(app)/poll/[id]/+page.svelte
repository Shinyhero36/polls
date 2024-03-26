<script lang="ts">
	import Countdown from '$lib/components/Countdown.svelte';
	import PollOptions from '$lib/components/PollOptions.svelte';
	import type { PollOption, PollOptionWithVotes } from '$lib/types';
	import { page } from '$app/stores';
	import type { PageServerData } from './$types';
	import { toast } from 'svelte-sonner';
	import Meta from '$lib/components/Meta.svelte';
	import Chat from '$lib/components/Chat.svelte';
	import { goto } from '$app/navigation';

	let {
		poll,
		messages,
		session
	}: {
		poll: PageServerData['poll'];
		messages: PageServerData['messages'];
		session: PageServerData['session'];
	} = $state({
		poll: $page.data.poll,
		messages: $page.data.messages,
		session: $page.data.session
	});

	const handleVote = (option: PollOption) => {
		const toastId = toast.loading('Voting...');

		const saveVote = async () => {
			if (!poll) throw new Error('Poll not found');
			if (!session) {
				await goto('/login');
				throw new Error('You need to be logged in to vote');
			}

			// Make sure the user hasn't already voted
			if (session && hasAlreadyVoted(poll.options, session.userId)) {
				throw new Error('You have already voted');
			}

			// Send vote to the server
			const form = new FormData();
			form.append('optionId', option.id);
			const res = await fetch(`/poll/${poll?.id}?/vote`, {
				method: 'POST',
				body: form
			});

			if (!res.ok) {
				throw new Error('Failed to vote');
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

		saveVote()
			.then(() => {
				toast.success('Voted successfully', { id: toastId });
			})
			.catch((err) => {
				toast.error(err.message, { id: toastId });
			});
	};

	const hasAlreadyVoted = (options: PollOptionWithVotes[], userId: string) => {
		return options.some((option) => option.votes.some((vote) => vote.userId === userId));
	};

	const findForWhatOptionUserVoted = (options: PollOptionWithVotes[], userId: string) => {
		const option = options.find((option) => option.votes.some((vote) => vote.userId === userId));
		return option?.option;
	};
</script>

<Meta title={poll?.question} description={poll?.description} />

{#if poll}
	<h1 class="poll-title">{poll.question}</h1>
	{#if poll.description}
		<p class="poll-description">{poll.description}</p>
	{/if}
	<div class="time-info">
		<Countdown until={poll.endsAt} />
	</div>

	<div class="poll">
		<div>
			<PollOptions bind:endsAt={poll.endsAt} bind:options={poll.options} onVote={handleVote} />
			<!-- Check if the usear has already voted -->
			{#if session && hasAlreadyVoted(poll.options, session?.userId)}
				<p class="already-voted">
					You voted for <span class="vote">
						{findForWhatOptionUserVoted(poll.options, session.userId)}
					</span>
				</p>
			{/if}
		</div>
		<Chat pollId={poll.id} messages={messages ?? []} />
	</div>
{/if}

<style lang="scss">
	.poll-title {
		margin-top: var(--space-6xl);
		font-size: var(--font-size-4xl);
		word-break: break-all;
	}

	.poll-description {
		margin-top: var(--space-md);
		font-size: var(--font-size-lg);
		line-height: var(--line-height-lg);
		color: var(--fg-app-subtle);
		word-break: break-all;
	}

	.poll-title,
	.poll-description {
		overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
	}

	.already-voted {
		margin-top: var(--space-4xl);
		color: var(--fg-app-subtle);

		.vote {
			font-weight: 500;
		}
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

		@media screen and (max-width: 768px) {
			grid-template-columns: 1fr;
		}
	}
</style>
