<script lang="ts">
	interface Props {
		variant?: 'primary';
		size?: 'lg' | 'md';

		type?: HTMLButtonElement['type'];
		href?: string;
		disabled?: boolean;
		onclick?: (event: MouseEvent) => void;

		children: any;
	}

	const {
		variant = 'primary',
		size = 'md',
		type = 'button',
		href = '',
		disabled = false,
		onclick,
		children,
		...rest
	}: Props = $props();
</script>

{#if href && !disabled}
	<a {href} class="button {variant} size-{size}" {...rest}>
		{@render children()}
	</a>
{:else}
	<button {onclick} class="button {variant} size-{size}" {disabled} {...rest}>
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
		font-size: inherit;
		font-weight: 500;

		width: fit-content;

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

		// States
		&:disabled {
			cursor: not-allowed;
			opacity: 0.5;
		}

		// Sizes
		&.size-md {
			height: var(--space-5xl);
			padding: 0 var(--space-2xl);
		}
		&.size-lg {
			height: var(--space-6xl);
			padding: 0 var(--space-3xl);
		}
	}
</style>
