import { db } from '$lib/server/db';
import { messages, pollOptions, polls, votes } from '$lib/server/db/schema';
import { z } from 'zod';

export const getPollWithOptionsAndVotes = async (pollId: string) => {
	return await db.query.polls.findFirst({
		where: ({ id }, { eq }) => eq(id, pollId),
		with: {
			options: {
				with: {
					votes: true
				}
			}
		}
	});
};

export const getOngoingPollsWithVotesAndCreatorInfo = async () => {
	const now = new Date();
	return await db.query.polls.findMany({
		where: ({ endsAt }, { gt }) => gt(endsAt, now),
		with: {
			options: {
				with: {
					votes: true
				}
			},
			user: {
				columns: {
					id: true,
					username: true,
					avatar: true
				}
			}
		},
		orderBy: ({ createdAt }, { desc }) => desc(createdAt)
	});
};

export const getFinishedPollsWithVotesAndCreatorInfo = async () => {
	const now = new Date();
	return await db.query.polls.findMany({
		where: ({ endsAt }, { lte }) => lte(endsAt, now),
		with: {
			options: {
				with: {
					votes: true
				}
			},
			user: {
				columns: {
					id: true,
					username: true,
					avatar: true
				}
			}
		},
		orderBy: ({ createdAt }, { desc }) => desc(createdAt)
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
	question: z.string().trim().min(1).max(100),
	description: z.string().trim().max(500).optional(),
	options: z.array(z.string().trim().min(1).max(100)).min(2).max(5),
	ends_at: z.coerce.date().refine((date) => new Date(date))
});

export const vote = async (optionId: string, userId: string) => {
	await db.insert(votes).values({
		pollOptionId: optionId,
		userId
	});
};

export const sendMessage = async (pollId: string, message: string, userId: string) => {
	await db.insert(messages).values({
		pollId,
		message,
		userId
	});
};
