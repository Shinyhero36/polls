<script lang="ts">
	import type { PollOption, PollOptionWithVotes } from '$lib/types';

	interface Props {
		endsAt: Date;
		options: PollOptionWithVotes[];

		onVote?: (option: PollOption) => void;
	}

	const { endsAt, options, onVote }: Props = $props();

	let maxVotes = $state(0);
	const isOver = endsAt < new Date();

	// Update maxVotes when options change
	$effect(() => {
		maxVotes = Math.max(...options.map((o) => o.votes.length));
	});

	const handlePollOptionClick = (option: PollOption) => {
		if (isOver) return;
		if (onVote) onVote(option);
	};
</script>

<div class="poll-options">
	{#each options as option}
		<button
			class="poll-option"
			class:isOver
			class:maxVotes={maxVotes === option.votes.length}
			on:click={() => handlePollOptionClick(option)}
		>
			<p>
				{option.option}
			</p>
			<div class="poll-stat">
				<div
					class="poll-bar"
					style="width: {maxVotes === 0 ? 0 : (option.votes.length / maxVotes) * 100}%"
				/>
				<span>{option.votes.length}</span>
			</div>
		</button>
	{/each}
</div>

<style lang="scss">
	.poll-options {
		.poll-option {
			// Unset button styles
			background-color: transparent;
			border: 0;

			width: 100%;
			display: flex;
			align-items: center;

			p {
				font-size: var(--font-size-lg);
				line-height: var(--line-height-lg);
				font-weight: 500;
				color: var(--fg-app-subtle);
				width: calc(var(--width-xxs) / 2);
				word-wrap: break-word;
			}

			&.isOver.maxVotes {
				.poll-stat {
					.poll-bar {
						background-color: var(--bg-surface-brand-solid);
						border: 2px solid transparent;
					}
				}
			}

			.poll-stat {
				flex: 1;
				display: flex;
				align-items: center;
				gap: var(--space-lg);

				border-left: 4px solid var(--border-neutral-subtle);

				.poll-bar {
					margin: var(--space-lg) 0;

					height: var(--space-7xl);
					width: 100%;
					background-color: var(--bg-surface-brand);

					border-left: 0 !important;
					border: 2px solid var(--border-brand-subtle);
					border-top-right-radius: var(--rounded-xl);
					border-bottom-right-radius: var(--rounded-xl);

					transition: width 400ms ease-in-out;
				}

				> span {
					color: var(--fg-app-subtle);
				}
			}

			// Change bar style when '.poll-option' is hovered
			&:hover {
				.poll-stat {
					.poll-bar {
						background-color: var(--bg-surface-brand-hover);
						border: 2px solid var(--border-brand-strong);

						transition:
							background-color 0.2s,
							border 0.2s;
					}
				}
			}
		}
	}
</style>
