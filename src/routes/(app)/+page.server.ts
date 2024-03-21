import { db } from '$lib/server/db';

export const load = async () => {
	const now = new Date();
	// Get ongoing polls
	const ongoing = await db.query.polls.findMany({
		where: ({ endsAt }, { gt }) => gt(endsAt, now),
		with: {
			options: true,
			user: {
				columns: {
					id: true,
					nickname: true
				}
			}
		}
	});

	// Get finished polls
	const finished = await db.query.polls.findMany({
		where: ({ endsAt }, { lte }) => lte(endsAt, now),
		with: {
			options: true,
			user: {
				columns: {
					id: true,
					nickname: true
				}
			}
		}
	});

	return {
		ongoing,
		finished
	};
};
