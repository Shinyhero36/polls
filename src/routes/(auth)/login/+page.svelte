<script lang="ts">
	import Button from '$lib/components/ui/Button/Button.svelte';
	import DiscordIcon from '$lib/components/Icons/DiscordIcon.svelte';
	import { getDiscordOAuth2Url } from '$lib/helpers/discord';
</script>

<div class="auth">
	<div>
		<h1>Welcome back</h1>
		<p>Sign in to your account to continue</p>
	</div>
	<div class="connections">
		<Button href={getDiscordOAuth2Url('my-state')} variant="discord" size="lg">
			<DiscordIcon />
			Continue with Discord
		</Button>
	</div>
</div>

<style lang="scss">
	div.auth {
		max-width: 350px;
		width: 100%;
		margin: 0 auto;

		display: flex;
		flex-direction: column;
		gap: var(--space-3xl);

		@media (max-width: 768px) {
			max-width: 100%;
		}

		.connections {
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
