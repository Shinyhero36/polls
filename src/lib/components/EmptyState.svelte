<script lang="ts">
	interface Props {
		message: string;
		extra?: string;

		children?: any;
	}

	const { message, extra, children }: Props = $props();
</script>

<div class="empty-state">
	<h4>{message}</h4>
	{#if extra}
		<p>{extra}</p>
	{/if}

	{#if children}
		<div class="actions">
			{@render children()}
		</div>
	{/if}
</div>

<style lang="scss">
	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		padding: var(--space-2xl);
		border-radius: var(--rounded-xl);
		background-color: var(--bg-surface);
		border: 2px solid var(--border-neutral-subtle);

		user-select: none;

		height: calc(var(--space-6xl) * 4);

		p {
			margin-top: var(--space-md);
			color: var(--fg-app-subtle);
			max-width: var(--width-xl);
		}

		.actions {
			margin-top: var(--space-xl);
			display: flex;
			gap: var(--space-md);
		}
	}
</style>
