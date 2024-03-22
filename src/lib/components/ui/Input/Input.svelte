<script lang="ts">
	interface Props {
		required?: boolean;
		type: HTMLInputElement['type'];
		name?: string;
		id?: string;
		label?: string;
		placeholder?: string;
		value?: any;
		error?: string;
		min?: any;
		max?: any;
	}

	let {
		required = false,
		type,
		name = '',
		id,
		label = '',
		placeholder = '',
		value = '',
		error,
		min,
		max
	}: Props = $props();
</script>

<div class="form-input">
	{#if label}
		<label for={id}>{label}</label>
	{/if}
	<input {type} {id} {name} {placeholder} {required} bind:value {min} {max} />
	{#if error}
		<p class="error">{error}</p>
	{/if}
</div>

<style lang="scss">
	.form-input {
		display: flex;
		flex-direction: column;

		label {
			margin-bottom: var(--space-md);
		}
		input {
			border: 2px solid var(--neutral-7);
			border-radius: var(--rounded-md);
			padding: 0 var(--space-lg);
			font-size: inherit;
			height: 40px;

			::placeholder {
				font-size: var(--neutral-7);
			}
		}
		p.error {
			font-size: var(--text-sm);
			line-height: var(--text-sm-line-height);
			font-weight: 300;
		}
	}
</style>
