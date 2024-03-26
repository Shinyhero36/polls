<script lang="ts">
	import ClockIcon from '$lib/components/Icons/ClockIcon.svelte';
	import SomethingIcon from '$lib/components/Icons/SomethingIcon.svelte';
	import type { Poll } from '$lib/types';

	interface Props {
		poll: Poll;
		totalOfVotes: number;
	}

	const { poll, totalOfVotes }: Props = $props();
</script>

<div class="poll-card" aria-label="{poll.question} by {poll.user.username}" title={poll.question}>
	<div class="author">
		<img
			src="https://cdn.discordapp.com/avatars/{poll.user.id}/{poll.user.avatar}.png"
			alt="{poll.user.username}'s discord avatar"
		/>
		<span>{poll.user.username}</span>
	</div>
	<h3>{poll.question}</h3>
	<footer>
		<div class="stat">
			<SomethingIcon />
			{#if totalOfVotes > 0}
				<span>{totalOfVotes} vote{totalOfVotes > 1 ? 's' : ''}</span>
			{:else}
				<span>No votes yet</span>
			{/if}
		</div>
		<div class="stat">
			<ClockIcon />
			<span>Ends on {poll.endsAt.toDateString()}</span>
		</div>
	</footer>
</div>

<style lang="scss">
	.poll-card {
		display: flex;
		flex-direction: column;
		gap: var(--space-xl);

		padding: var(--space-2xl);
		border-radius: var(--rounded-xl);
		background-color: var(--bg-surface);
		border: 2px solid var(--border-neutral-subtle);

		height: 100%;

		user-select: none;

		&:hover {
			background-color: var(--bg-surface-brand-hover);
			border: 2px solid var(--border-brand-strong);
		}

		h3 {
			overflow: hidden;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 3;
			word-break: break-all;
		}
	}

	.author {
		display: flex;
		gap: var(--space-md);
		align-items: center;

		img {
			width: var(--space-3xl);
			height: var(--space-3xl);
			border-radius: var(--rounded-full);
		}

		span {
			font-size: var(--font-size-sm);
			line-height: var(--line-height-sm);
		}
	}

	h3 {
		font-size: var(--font-size-xl);
		line-height: var(--line-height-xl);
	}

	footer {
		margin-top: auto;
		display: flex;
		align-items: center;
		gap: var(--space-2xl);

		.stat {
			display: flex;
			align-items: center;
			gap: var(--space-sm);

			:global(svg) {
				width: var(--space-2xl);
				height: var(--space-2xl);
				color: var(--border-brand-strong);
			}

			span {
				font-weight: 300;
				color: var(--fg-app-subtle);
			}
		}
	}
</style>
