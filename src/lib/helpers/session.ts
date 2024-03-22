import { db } from '$lib/server/db';
import { sessions } from '$lib/server/db/schema';
import type { Cookies } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const deleteSessions = async (userId: string) => {
	await db.delete(sessions).where(eq(sessions.userId, userId));
};

export const getSession = async (sessionId: string) => {
	return await db.query.sessions.findFirst({
		where: ({ id }, { eq }) => eq(id, sessionId),
		with: {
			user: true
		}
	});
};

export const createSession = async (userId: string, expiresAt: Date) => {
	const [session] = await db
		.insert(sessions)
		.values({
			userId,
			expiresAt
		})
		.returning();
	return session;
};

export const updateSession = async (sessionId: string, expiresAt: Date) => {
	const [session] = await db
		.update(sessions)
		.set({
			expiresAt
		})
		.where(eq(sessions.id, sessionId))
		.returning();
	return session;
};

export const createCookie = ({
	cookies,
	sessionId,
	expiresAt
}: {
	sessionId: string;
	expiresAt: Date;
	cookies: Cookies;
}) => {
	cookies.set('sessionId', sessionId, {
		path: '/',
		expires: expiresAt,
		httpOnly: true,
		priority: 'high',
		sameSite: true,
		secure: true
	});
};
