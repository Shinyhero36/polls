<script lang="ts">
	interface Props {
		children?: any;
	}
	const { children }: Props = $props();
</script>

<div class="separator">
	<hr />
	{#if children}
		<div class="text">
			{@render children()}
		</div>
		<hr />
	{/if}
</div>

<style>
	.separator {
		display: flex;
		align-items: center;
		text-align: center;

		hr {
			flex-grow: 1;
			height: 2px;
			border: 1px solid var(--border-neutral);
			color: var(--border-neutral);
			background-color: var(--border-neutral);
		}

		.text {
			margin: 0 var(--space-md);
			color: var(--fg-app-subtle);
			user-select: none;
		}
	}
</style>
