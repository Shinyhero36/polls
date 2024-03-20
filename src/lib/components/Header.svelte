<header>
	<div class="container">
		<span class="logo">Svote</span>

		<div class="actions"></div>
	</div>
</header>

<style lang="scss">
	header {
		position: sticky;
		top: 0;
		z-index: 10;
		backdrop-filter: blur(8px);

		.container {
			display: flex;
			align-items: center;
			justify-content: space-between;

			padding-top: var(--space-xl);
			padding-bottom: var(--space-xl);

			.logo {
				font-weight: 500;
				font-size: var(--font-size-lg);
				line-height: var(--line-height-lg);
			}

			.actions {
				display: flex;
				align-items: center;
				gap: var(--space-xl);
			}
		}
	}
</style>
