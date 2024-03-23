import { db } from '$lib/server/db';
import { pollOptions, polls } from '$lib/server/db/schema';
import { z } from 'zod';

export const getPoll = async (pollId: string) => {
	return await db.query.polls.findFirst({
		where: ({ id }, { eq }) => eq(id, pollId),
		with: {
			options: true
		}
	});
};

export const createPoll = async ({
	userId,
	question,
	description,
	options,
	endsAt
}: {
	userId: string;
	question: string;
	description?: string;
	options: string[];
	endsAt: Date;
}) => {
	const [poll] = await db
		.insert(polls)
		.values({
			question,
			description,
			endsAt,
			userId
		})
		.returning();

	await db.insert(pollOptions).values(
		options.map((option) => ({
			pollId: poll.id,
			option
		}))
	);

	return poll.id;
};

export const validatePoll = z.object({
	question: z.string().min(1).max(255),
	description: z.string().min(1).max(500).optional(),
	options: z.array(z.string().min(1).max(255)).min(2).max(5),
	ends_at: z.coerce.date().refine((date) => new Date(date))
});
