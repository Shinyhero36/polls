<script lang="ts">
	interface Props {
		until: Date;
	}

	const { until }: Props = $props();
	let days = $state(0);
	let hours = $state(0);
	let minutes = $state(0);
	let seconds = $state(0);

	const countdown = () => {
		const from = new Date();
		const distance = until.getTime() - from.getTime();
		if (distance < 0) {
			days = hours = minutes = seconds = 0;
			return;
		}

		days = Math.floor(distance / (1000 * 60 * 60 * 24));
		hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		seconds = Math.floor((distance % (1000 * 60)) / 1000);

		// Add leading zeros if needed
		hours = +hours.toString().padStart(2, '0');
		minutes = +minutes.toString().padStart(2, '0');
		seconds = +seconds.toString().padStart(2, '0');
	};

	setInterval(() => {
		countdown();
	}, 1000);
</script>

<div class="timer">
	<div>
		<span class="countdown">
			<span style="--value: {days};"></span>
		</span>
		days
	</div>
	<div>
		<span class="countdown">
			<span style="--value: {hours};"></span>
		</span>
		hours
	</div>
	<div>
		<span class="countdown">
			<span style="--value: {minutes};"></span>
		</span>
		minutes
	</div>
	<div>
		<span class="countdown">
			<span style="--value: {seconds};"></span>
		</span>
		seconds
	</div>
</div>

<style lang="scss">
	.timer {
		display: flex;
		gap: var(--space-2xl);

		div {
			.countdown {
				display: inline-flex;
				font-size: var(--font-size-4xl);
				line-height: 1em;

				span {
					height: 1em;
					display: inline-block;
					overflow-y: hidden;

					&::before {
						position: relative;
						content: '00\a 01\a 02\a 03\a 04\a 05\a 06\a 07\a 08\a 09\a 10\a 11\a 12\a 13\a 14\a 15\a 16\a 17\a 18\a 19\a 20\a 21\a 22\a 23\a 24\a 25\a 26\a 27\a 28\a 29\a 30\a 31\a 32\a 33\a 34\a 35\a 36\a 37\a 38\a 39\a 40\a 41\a 42\a 43\a 44\a 45\a 46\a 47\a 48\a 49\a 50\a 51\a 52\a 53\a 54\a 55\a 56\a 57\a 58\a 59\a 60\a 61\a 62\a 63\a 64\a 65\a 66\a 67\a 68\a 69\a 70\a 71\a 72\a 73\a 74\a 75\a 76\a 77\a 78\a 79\a 80\a 81\a 82\a 83\a 84\a 85\a 86\a 87\a 88\a 89\a 90\a 91\a 92\a 93\a 94\a 95\a 96\a 97\a 98\a 99\a';
						white-space: pre;
						top: calc(var(--value) * -1em);
						text-align: center;
						transition: all 1s cubic-bezier(1, 0, 0, 1);
					}
				}
			}
		}
	}
</style>
