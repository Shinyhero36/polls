import { TWO_WEEKS, extendSession, getSession } from '$lib/helpers/account';

const SESSION_COOKIE_NAME = 'sessionId';

export const handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get(SESSION_COOKIE_NAME);

	event.locals.getSession = async () => {
		if (!sessionId) return null;

		const session = await getSession(sessionId);
		if (!session) return null;

		// Check if the session is expired
		if (session.expiresAt.getTime() < Date.now()) return null;

		// Check if the session will expire in the next 14 days
		if (session.expiresAt.getDate() - Date.now() <= TWO_WEEKS) {
			// Extend the session by 14 days
			return await extendSession(session);
		}

		return session;
	};

	return await resolve(event);
};
