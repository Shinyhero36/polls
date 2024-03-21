<script lang="ts">
	import type { PollOption } from '$lib/types';

	interface Props {
		endsAt: Date;
		options: PollOption[];
	}

	const { endsAt, options }: Props = $props();

	const maxVotes = Math.max(...options.map((option) => option.votes));
	const isOver = endsAt < new Date();

	const computeOptionWidth = (votes: number) => {
		if (maxVotes === 0) return '0%';
		const percentage = (votes / maxVotes) * 100;
		return `${percentage}%`;
	};
</script>

<div class="poll-options">
	{#each options as option}
		<div class="poll-option" class:isOver class:maxVotes={maxVotes === option.votes}>
			<p>
				{option.option}
			</p>
			<div class="poll-stat">
				<div class="poll-bar" style="width: {computeOptionWidth(option.votes)}" />
				<span>{option.votes}</span>
			</div>
		</div>
	{/each}
</div>

<style lang="scss">
	.poll-options {
		.poll-option {
			display: flex;
			align-items: center;

			p {
				font-size: var(--font-size-lg);
				line-height: var(--line-height-lg);
				font-weight: 500;
				color: var(--fg-app-subtle);
				width: calc(var(--width-xxs) / 2);
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
