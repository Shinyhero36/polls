<script lang="ts">
	import Input from '$lib/components/ui/Input/Input.svelte';
	import Separator from '$lib/components/Separator.svelte';
	import type { Message } from '$lib/types';
	import { enhance } from '$app/forms';
	import autoAnimate from '@formkit/auto-animate';

	interface Props {
		pollId: string;
		messages: Message[];
	}

	const { pollId, messages: dbMessages }: Props = $props();
	let messages = $state(dbMessages);
	let message = $state('');
</script>

{#snippet MessageCard(m: Message)}
	<div class="poll-message">
		<img
			src="https://cdn.discordapp.com/avatars/{m.userId}/{m.user.avatar}.png"
			alt="{m.user.username}'s Discord avatar"
			width="40"
			height="40"
		/>

		<div>
			<p class="username">
				{m.user.username} - <span class="date">{m.createdAt.toDateString()}</span>
			</p>
			<p class="message">{m.message}</p>
		</div>
	</div>

	<style lang="scss">
		.poll-message {
			display: flex;
			align-items: flex-start;
			gap: var(--space-md);

			padding: var(--space-md);
			border-radius: var(--rounded-lg);

			word-break: break-all;

			&:hover {
				background-color: var(--bg-surface);
			}

			img {
				border-radius: var(--rounded-full);
			}

			.username {
				font-weight: 500;

				& > .date {
					font-weight: 400;
					color: var(--fg-app-brand);
				}
			}

			.message {
				padding: 0;
				color: var(--fg-app-subtle);
			}
		}
	</style>
{/snippet}

<div class="chat">
	<form
		method="post"
		action="/poll/{pollId}?/message"
		use:enhance={() => {
			return async ({ update, result }) => {
				if (result.type === 'success') {
					messages.push({
						id: '',
						createdAt: new Date(),
						message,
						// @ts-ignore
						userId: result.data.id,
						pollId,
						user: {
							// @ts-ignore
							avatar: result.data.avatar,
							// @ts-ignore
							username: result.data.username
						}
					});
					message = '';
				}

				await update();
			};
		}}
	>
		<Input
			required
			type="text"
			name="message"
			label="Message"
			placeholder="Type a message..."
			bind:value={message}
		/>
	</form>

	<Separator />

	<div class="messages" use:autoAnimate>
		{#each messages as msg}
			{@render MessageCard(msg)}
		{/each}
	</div>
</div>

<style lang="scss">
	.chat {
		display: flex;
		flex-direction: column;
		gap: var(--space-xl);
		height: var(--width-lg);

		padding: var(--space-2xl);
		border-radius: var(--rounded-xl);
		background-color: var(--bg-app-subtle);
		border: 2px solid var(--border-neutral-subtle);

		.messages {
			display: flex;
			flex-direction: column;
			gap: var(--space-sm);
			overflow-y: auto;
			height: 100%;
		}
	}
</style>
