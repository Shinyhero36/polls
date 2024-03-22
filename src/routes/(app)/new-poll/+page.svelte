<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/Button/Button.svelte';
	import Input from '$lib/components/ui/Input/Input.svelte';

	const oneWeekFromToday = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString();

	let formMessage = $state({
		question: '',
		options: []
	});

	let isLoading = $state(false);
</script>

<h1>New poll</h1>

<form
	method="post"
	use:enhance={() => {
		isLoading = true;

		return async ({ result, update }) => {
			isLoading = false;
			if (result.type === 'failure') {
				formMessage = result.data as typeof formMessage;
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

	<Input required type="date" name="ends_at" id="ends_at" label="Ends at" max={oneWeekFromToday} />

	{#each new Array(4).fill('') as _, i}
		<Input
			required={i < 2}
			type="text"
			name="options"
			placeholder="option {i + 1}"
			error={formMessage.options[i]}
		/>
	{/each}

	<div class="actions">
		<Button type="submit" inline disabled={isLoading}>Create poll</Button>
		<Button href="/" inline variant="tertiary">Cancel</Button>
	</div>
</form>

<style lang="scss">
	form {
		display: flex;
		flex-direction: column;
		gap: var(--space-xl);

		.actions {
			display: flex;
			gap: var(--space-md);
		}
	}
</style>
