<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/Button/Button.svelte';
	import Input from '$lib/components/ui/Input/Input.svelte';

	let formMessages = $state({
		nickname: '',
		email: '',
		password: ''
	});
	let loading = $state(false);
</script>

<form
	method="post"
	use:enhance={() => {
    loading = true;

    return async ({ update, result }) => {
      loading = false;

      if (result.type === "failure") {
        if (result.data) {
          formMessages = result.data as typeof formMessages;
        }
      }
      return await update();
    };
  }}
>
	<div>
		<h1>Get started</h1>
		<p>Create a new account</p>
	</div>
	<div class="form-elements">
		<Input
			required
			name="nickname"
			type="text"
			label="Nickname"
			placeholder="John Doe"
			error={formMessages.nickname}
		/>
		<Input
			required
			name="email"
			type="email"
			label="Email"
			placeholder="john.doe@company.com"
			error={formMessages.email}
		/>
		<Input
			required
			name="password"
			type="password"
			label="Password"
			error={formMessages.password}
		/>
		<Button type="submit" disabled={loading}>
			{#if loading}
				Loading...
			{:else}
				Register
			{/if}
		</Button>
	</div>
	<p>
		Already have an account? <Button variant="tertiary" href="/login">Log in</Button>
	</p>
</form>

<style lang="scss">
	form {
		max-width: 350px;
		width: 100%;
		margin: 0 auto;

		display: flex;
		flex-direction: column;
		gap: var(--space-3xl);

		@media (max-width: 768px) {
			max-width: 100%;
		}

		.form-elements {
			display: flex;
			flex-direction: column;
			gap: var(--space-lg);
		}

		div {
			p {
				font-size: var(--font-size-lg);
				line-height: var(--line-height-lg);
				color: var(--fg-app-subtle);
			}
		}
	}
</style>
