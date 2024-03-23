import { pollOptions, polls, sessions, users, votes } from '$lib/server/db/schema';

export type User = typeof users.$inferSelect;

export type SessionWithUser = typeof sessions.$inferSelect & {
	user: User;
};

export type Vote = typeof votes.$inferSelect;

export type PollOption = typeof pollOptions.$inferSelect;

export type PollOptionWithVotes = PollOption & {
	votes: Vote[];
};

export type Poll = typeof polls.$inferSelect & {
	user: Pick<User, 'avatar' | 'username'>;
	options: PollOption[];
};
