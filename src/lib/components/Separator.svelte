<script lang="ts">
	interface Props {
		children: any;
	}
	const { children }: Props = $props();
</script>

<div class="separator">
	<hr />
	<div class="text">
		{@render children()}
	</div>
	<hr />
</div>

<style>
	.separator {
		display: flex;
		align-items: center;
		text-align: center;

		hr {
			flex-grow: 1;
			height: 1px;
			background-color: var(--fg-app-subtle);
		}

		.text {
			margin: 0 var(--space-md);
			color: var(--fg-app-subtle);
			user-select: none;
		}
	}
</style>
