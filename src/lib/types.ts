import { pollOptions, polls, sessions, users } from '$lib/server/db/schema';

export type User = typeof users.$inferSelect;

export type SessionWithUser = typeof sessions.$inferSelect & {
	user: User;
};

export type PollOption = typeof pollOptions.$inferSelect;

export type Poll = typeof polls.$inferSelect & {
	user: Pick<User, 'id' | 'nickname'>;
	options: PollOption[];
};
