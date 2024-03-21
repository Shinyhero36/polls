import { db } from '$lib/server/db';

export const getPoll = async (pollId: string) => {
	return await db.query.polls.findFirst({
		where: ({ id }, { eq }) => eq(id, pollId),
		with: {
			options: true
		}
	});
};
