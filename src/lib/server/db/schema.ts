import { pgTable, text, varchar, timestamp, primaryKey } from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';

export const users = pgTable('users', {
	id: text('id').primaryKey(),
	username: varchar('nickname', {
		length: 50
	}).notNull(),
	avatar: text('avatar').notNull(),
	refreshToken: text('refresh_token').notNull(),
	accessToken: text('access_token').notNull()
});

export const sessions = pgTable('sessions', {
	id: text('id')
		.primaryKey()
		.default(sql`gen_random_uuid()`),
	userId: text('user_id')
		.references(() => users.id, { onDelete: 'cascade' })
		.notNull(),
	expiresAt: timestamp('expires_at').notNull()
});

export const polls = pgTable('polls', {
	id: text('id')
		.primaryKey()
		.default(sql`gen_random_uuid()`),
	question: varchar('question', {
		length: 100
	}).notNull(),
	description: varchar('description', {
		length: 100
	}),
	userId: text('user_id')
		.references(() => users.id, { onDelete: 'cascade' })
		.notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	endsAt: timestamp('ends_at').notNull()
});

export const pollOptions = pgTable('poll_options', {
	id: text('id')
		.primaryKey()
		.default(sql`gen_random_uuid()`),
	pollId: text('poll_id')
		.references(() => polls.id, { onDelete: 'cascade' })
		.notNull(),
	option: varchar('option', {
		length: 100
	}).notNull()
});

export const votes = pgTable(
	'votes',
	{
		userId: text('user_id')
			.references(() => users.id, { onDelete: 'cascade' })
			.notNull(),
		pollOptionId: text('poll_option_id')
			.references(() => pollOptions.id, { onDelete: 'cascade' })
			.notNull()
	},
	(t) => ({
		pk: primaryKey({
			name: 'votes_pk',
			columns: [t.userId, t.pollOptionId]
		})
	})
);

export const messages = pgTable('messages', {
	id: text('id')
		.primaryKey()
		.default(sql`gen_random_uuid()`),
	userId: text('user_id')
		.references(() => users.id, { onDelete: 'cascade' })
		.notNull(),
	pollId: text('poll_id')
		.references(() => polls.id, { onDelete: 'cascade' })
		.notNull(),
	message: varchar('message', {
		length: 500
	}).notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow()
});

export const usersRelations = relations(users, ({ many }) => ({
	polls: many(polls),
	sessions: many(sessions),
	votes: many(votes),
	messages: many(messages)
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
	user: one(users, {
		fields: [sessions.userId],
		references: [users.id]
	})
}));

export const pollsRelations = relations(polls, ({ one, many }) => ({
	user: one(users, {
		fields: [polls.userId],
		references: [users.id]
	}),
	options: many(pollOptions),
	messages: many(messages)
}));

export const pollOptionsRelations = relations(pollOptions, ({ one, many }) => ({
	poll: one(polls, {
		fields: [pollOptions.pollId],
		references: [polls.id]
	}),
	votes: many(votes)
}));

export const votesRelations = relations(votes, ({ one }) => ({
	user: one(users, {
		fields: [votes.userId],
		references: [users.id]
	}),
	option: one(pollOptions, {
		fields: [votes.pollOptionId],
		references: [pollOptions.id]
	})
}));

export const messagesRelations = relations(messages, ({ one }) => ({
	user: one(users, {
		fields: [messages.userId],
		references: [users.id]
	}),
	poll: one(polls, {
		fields: [messages.pollId],
		references: [polls.id]
	})
}));
