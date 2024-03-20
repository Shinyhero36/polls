<script lang="ts">
	import CommentIcon from '$lib/components/Icons/CommentIcon.svelte';
	import SomethingIcon from '$lib/components/Icons/SomethingIcon.svelte';
	import type { Poll } from '$lib/types';

	interface Props {
		poll: Poll;
	}

	const { poll }: Props = $props();
</script>

<div class="poll-card">
	<div class="author">
		<img src="https://github.com/Shinyhero36.png" alt="S" />
		<span>{poll.user.nickname}</span>
	</div>
	<h3>{poll.question}</h3>
	<footer>
		<div class="stat">
			<SomethingIcon />
			<span>11 answers</span>
		</div>
		<div class="stat">
			<CommentIcon />
			<span>138.6k messages</span>
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

		user-select: none;

		&:hover {
			background-color: var(--bg-surface-brand-hover);
			border: 2px solid var(--border-brand-strong);
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
