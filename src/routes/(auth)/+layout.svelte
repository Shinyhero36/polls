<div class="auth-container">
	<aside>
		<p>Svote</p>
		<blockquote></blockquote>
	</aside>
	<main>
		<slot />
	</main>
</div>

<style lang="scss">
	.auth-container {
		display: flex;
		height: 100svh;

		aside,
		main {
			flex: 1;
		}

		aside {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding: var(--space-4xl);
			background-color: var(--neutral-12);

			> * {
				color: var(--neutral-1);
			}

			p {
				font-weight: 500;
				font-size: var(--font-size-2xl);
				line-height: var(--line-height-2xl);
			}

			@media screen and (max-width: 1024px) {
				display: none;
			}
		}

		main {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			padding: var(--space-4xl);
		}
	}
</style>
