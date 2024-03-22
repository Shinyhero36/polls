<script lang="ts">
	interface Props {
		variant?: 'primary' | 'secondary' | 'tertiary' | 'discord';
		size?: 'lg' | 'md';

		inline?: boolean;

		type?: HTMLButtonElement['type'];
		href?: string;
		disabled?: boolean;
		onclick?: (event: MouseEvent) => void;

		children: any;
	}

	const {
		variant = 'primary',
		size = 'md',
		inline = false,
		type = 'button',
		href = '',
		disabled = false,
		onclick,
		children,
		...rest
	}: Props = $props();
</script>

{#if href && !disabled}
	<a {href} class="button {variant} size-{size}" class:inline {...rest}>
		{@render children()}
	</a>
{:else}
	<button {onclick} class="button {variant} size-{size}" class:inline {disabled} {...rest}>
		{@render children()}
	</button>
{/if}

<style lang="scss">
	.button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-md);

		cursor: pointer;
		text-decoration: none;

		color: var(--_text);
		background-color: var(--_bg);
		border: 2px solid var(--_border);
		border-radius: var(--rounded-md);

		font-family: inherit;
		font-weight: 500;

		// Inline
		&.inline {
			width: fit-content;
		}

		// Variants
		&.primary {
			--_text: var(--neutral-12);
			--_bg: var(--primary-9);
			--_border: var(--primary-9);

			&:hover {
				--_bg: var(--primary-10);
				--_border: var(--primary-10);
			}
		}
		&.secondary {
			--_text: var(--primary-11);
			--_bg: var(--primary-3);
			--_border: var(--primary-7);

			&:hover {
				--_bg: var(--primary-4);
				--_border: var(--primary-8);
			}
		}
		&.tertiary {
			--_text: var(--neutral-11);
			--_bg: transparent;
			--_border: transparent;

			&:hover {
				--_bg: var(--neutral-3);
			}
		}
		&.discord {
			--_text: var(--fg-discord);
			--_bg: var(--bg-discord);
			--_border: transparent;

			&:hover {
				--_bg: var(--bg-discord-hover);
			}
		}

		// States
		&:disabled {
			cursor: not-allowed;
			opacity: 0.5;
		}

		// Sizes
		&.size-md {
			height: var(--space-5xl);
			padding: 0 var(--space-2xl);
			font-size: var(--font-size-md);
			line-height: var(--line-height-md);
		}
		&.size-lg {
			height: var(--space-6xl);
			padding: 0 var(--space-3xl);
			font-size: var(--font-size-lg);
			line-height: var(--line-height-lg);
		}
	}
</style>
