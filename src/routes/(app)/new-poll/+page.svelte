<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/Button/Button.svelte';
	import Input from '$lib/components/ui/Input/Input.svelte';
	import SpinnerIcon from '$lib/components/icons/SpinnerIcon.svelte';
	import { toast } from 'svelte-sonner';

	const now = new Date().toISOString().split(':').slice(0, 2).join(':');
	const oneWeekFromToday = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
		.toISOString()
		.split(':')
		.slice(0, 2)
		.join(':');

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
	/>

	<div class="options">
		{#each new Array(4).fill('') as _, i}
			<Input
				required={i < 2}
				type="text"
				name="options"
				placeholder="option {i + 1}"
				label={i === 0 ? 'Vote options' : ''}
				error={formMessage.options[i]}
			/>
		{/each}
	</div>

	<Input
		required
		type="datetime-local"
		name="ends_at"
		id="ends_at"
		label="End date"
		placeholder="When does the poll end ?"
		min={now}
		max={oneWeekFromToday}
		hint="Poll max duration is 7 days"
	/>

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
