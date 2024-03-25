<script lang="ts">
	interface Props {
		required?: boolean;
		name?: string;
		id?: string;
		label?: string;
		placeholder?: string;
		value?: any;
		hint?: string;
		error?: string;

		children?: any;
	}

	let {
		required = false,
		name = '',
		id,
		label = '',
		placeholder = '',
		value = '',
		hint = '',
		error,
		children
	}: Props = $props();
</script>

<div class="form-select">
	{#if label}
		<label for={id}>{label}</label>
	{/if}
	<select {id} {name} {placeholder} {required} bind:value>
		{@render children()}
	</select>
	{#if hint && !error}
		<p class="hint">{hint}</p>
	{:else if error}
		<p class="error">{error}</p>
	{/if}
</div>

<style lang="scss">
	.form-select {
		display: flex;
		flex-direction: column;

		label {
			margin-bottom: var(--space-md);
			font-weight: 500;
		}
		select {
			border: 2px solid var(--neutral-7);
			border-radius: var(--rounded-md);
			padding: 0 var(--space-lg);
			font-size: inherit;
			height: 40px;
			background-color: var(--neutral-3);
			color: var(--neutral-11);

			&::placeholder {
				color: var(--fg-app-subtle);
			}
		}

		textarea {
			height: var(--space-9xl);
			resize: vertical;
			padding: var(--space-lg);
		}

		p.hint,
		p.error {
			margin-top: var(--space-sm);
			font-size: var(--font-size-sm);
			line-height: var(--line-height-sm);
			font-weight: 300;
		}

		p.error {
			color: red; // TODO: Add error colors
		}
	}
</style>
