<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/Button/Button.svelte';
	import Input from '$lib/components/ui/Input/Input.svelte';
	import SpinnerIcon from '$lib/components/Icons/SpinnerIcon.svelte';
	import { toast } from 'svelte-sonner';
	import Select from '$lib/components/ui/Select/Select.svelte';

	const ONE_HOUR = 3600 * 1000;

	const now = new Date();
	const in1H = new Date(now.getTime() + ONE_HOUR).toISOString();
	const in2H = new Date(now.getTime() + ONE_HOUR * 2).toISOString();
	const in5H = new Date(now.getTime() + ONE_HOUR * 5).toISOString();
	const in12H = new Date(now.getTime() + ONE_HOUR * 12).toISOString();
	const in1D = new Date(now.getTime() + ONE_HOUR * 24).toISOString();
	const in2D = new Date(now.getTime() + ONE_HOUR * 48).toISOString();
	const in3D = new Date(now.getTime() + ONE_HOUR * 72).toISOString();
	const in4D = new Date(now.getTime() + ONE_HOUR * 96).toISOString();
	const in5D = new Date(now.getTime() + ONE_HOUR * 120).toISOString();
	const in6D = new Date(now.getTime() + ONE_HOUR * 144).toISOString();
	const in7D = new Date(now.getTime() + ONE_HOUR * 168).toISOString();

	let formMessage = $state({
		question: '',
		description: '',
		options: []
	});

	let isLoading = $state(false);
</script>

<form
	method="post"
	use:enhance={() => {
		isLoading = true;

		return async ({ result, update }) => {
			isLoading = false;
			if (result.type === 'failure') {
				formMessage = result.data as typeof formMessage;
			} else if (result.type === 'success') {
				toast.success('Poll created successfully');
			}

			await update();
		};
	}}
>
	<Input
		required
		type="text"
		name="question"
		id="question"
		label="Question"
		placeholder="Is this a poll ?"
		error={formMessage.question}
		maxlength={100}
	/>

	<Input
		type="text"
		name="description"
		id="description"
		label="Description"
		placeholder="Add a description"
		hint="Optional"
		error={formMessage.description}
		textarea
		maxlength={100}
	/>

	<div class="options">
		{#each new Array(4).fill('') as _, i}
			<Input
				required={i < 2}
				type="text"
				name="options"
				placeholder="option {i + 1}{i > 1 ? ' (optional)' : ''}"
				label={i === 0 ? 'Vote options' : ''}
				error={formMessage.options[i]}
				maxlength={100}
			/>
		{/each}
	</div>

	<!-- TODO: SHould be based on submit date -->
	<Select
		required
		name="ends_at"
		id="ends_at"
		label="End date"
		placeholder="When does the poll end ?"
	>
		<option value={in1H}>In 1 hour</option>
		<option value={in2H}>In 2 hours</option>
		<option value={in5H}>In 5 hours</option>
		<option value={in12H}>In 12 hours</option>
		<option value={in1D}>In 24 hours</option>
		<option value={in2D}>In 2 days</option>
		<option value={in3D}>In 3 days</option>
		<option value={in4D}>In 4 days</option>
		<option value={in5D}>In 5 days</option>
		<option value={in6D}>In 6 days</option>
		<option value={in7D}>In 7 days</option>
	</Select>

	<div class="actions">
		<Button type="submit" inline disabled={isLoading}>
			{#if isLoading}
				<SpinnerIcon class="spinner" />
				Loading...
			{:else}
				Create poll
			{/if}
		</Button>
		<Button href="/" inline variant="tertiary">Cancel</Button>
	</div>
</form>

<style lang="scss">
	form {
		display: flex;
		flex-direction: column;
		gap: var(--space-3xl);
		max-width: var(--width-2xl);
		margin: 0 auto;
		margin-top: var(--space-6xl);

		.options {
			display: flex;
			flex-direction: column;
			gap: var(--space-xl);
		}
		.actions {
			display: flex;
			gap: var(--space-md);
		}
	}

	:global(.spinner) {
		animation: spin 1s linear infinite;

		@keyframes spin {
			0% {
				transform: rotate(0deg);
			}
			100% {
				transform: rotate(360deg);
			}
		}
	}
</style>
