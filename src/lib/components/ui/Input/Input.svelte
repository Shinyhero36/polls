<script lang="ts">
	interface Props {
		required?: boolean;
		type: HTMLInputElement['type'];
		name?: string;
		id?: string;
		label?: string;
		placeholder?: string;
		value?: any;
		hint?: string;
		error?: string;
		min?: any;
		max?: any;
		textarea?: boolean;
	}

	let {
		required = false,
		type,
		name = '',
		id,
		label = '',
		placeholder = '',
		value = '',
		hint = '',
		error,
		min,
		max,
		textarea = false
	}: Props = $props();
</script>

<div class="form-input">
	{#if label}
		<label for={id}>{label}</label>
	{/if}
	{#if !textarea}
		<input {type} {id} {name} {placeholder} {required} bind:value {min} {max} />
	{:else}
		<textarea {id} {name} {placeholder} {required} bind:value />
	{/if}
	{#if hint && !error}
		<p class="hint">{hint}</p>
	{:else if error}
		<p class="error">{error}</p>
	{/if}
</div>

<style lang="scss">
	.form-input {
		display: flex;
		flex-direction: column;

		label {
			margin-bottom: var(--space-md);
			font-weight: 500;
		}
		input,
		textarea {
			border: 2px solid var(--neutral-7);
			border-radius: var(--rounded-md);
			padding: 0 var(--space-lg);
			font-size: inherit;
			height: 40px;
			background-color: var(--neutral-3);

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
