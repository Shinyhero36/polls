import { pgTable, text, varchar, timestamp, integer } from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';

export const users = pgTable('users', {
	id: text('id')
		.primaryKey()
		.default(sql`gen_random_uuid()`),
	nickname: varchar('nickname', {
		length: 50
	}).notNull(),
	email: text('email').unique().notNull(),
	password: varchar('password', {
		length: 100
	}).notNull(),
	challenge: text('challenge'),
	challengeExpiresAt: timestamp('challenge_expires_at')
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

export const passkeys = pgTable('passkeys', {
	id: text('id').primaryKey(),
	publicKey: text('public_key').notNull(),
	userId: text('user_id')
		.references(() => users.id, { onDelete: 'cascade' })
		.notNull(),
	name: varchar('name', {
		length: 50
	}).notNull(),
	counter: integer('counter').notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow()
});

export const polls = pgTable('polls', {
	id: text('id')
		.primaryKey()
		.default(sql`gen_random_uuid()`),
	question: varchar('question', {
		length: 100
	}).notNull(),
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
	}).notNull(),
	votes: integer('votes').notNull().default(0)
});

export const usersRelations = relations(users, ({ many }) => ({
	sessions: many(sessions),
	passkeys: many(passkeys),
	polls: many(polls)
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
	user: one(users, {
		fields: [sessions.userId],
		references: [users.id]
	})
}));

export const passkeysRelations = relations(passkeys, ({ one }) => ({
	user: one(users, {
		fields: [passkeys.userId],
		references: [users.id]
	})
}));

export const pollsRelations = relations(polls, ({ one, many }) => ({
	user: one(users, {
		fields: [polls.userId],
		references: [users.id]
	}),
	options: many(pollOptions)
}));

export const pollOptionsRelations = relations(pollOptions, ({ one }) => ({
	poll: one(polls, {
		fields: [pollOptions.pollId],
		references: [polls.id]
	})
}));
