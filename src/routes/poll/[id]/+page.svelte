<script lang="ts">
	import Countdown from '$lib/components/Countdown.svelte';
	import { fail } from '@sveltejs/kit';

	export let data;
	const { poll } = data;
</script>

{#if poll}
	<h1>{poll.question}</h1>
	<div class="time-info">
		<Countdown until={poll.endsAt} />
	</div>

	<div class="poll"></div>
{/if}

<style lang="scss">
	h1 {
		margin-top: var(--space-6xl);
		font-size: var(--font-size-4xl);
	}

	.time-info {
		margin-top: var(--space-2xl);
		display: flex;
		align-items: center;
		gap: var(--space-md);
		color: var(--fg-app-subtle);

		p {
			font-size: var(--font-size-xl);
			line-height: var(--line-height-xl);
		}
	}

	.poll {
		margin-top: var(--space-8xl);
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: var(--space-2xl);
	}
</style>
