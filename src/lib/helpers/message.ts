import { db } from '$lib/server/db';

export const getPollMessages = async (pollId: string) => {
	return await db.query.messages.findMany({
		where: ({ pollId: poll_id }, { eq }) => eq(poll_id, pollId),
		with: {
			user: {
				columns: {
					avatar: true,
					username: true
				}
			}
		},
		limit: 10,
		orderBy: ({ createdAt }, { desc }) => desc(createdAt)
	});
};
