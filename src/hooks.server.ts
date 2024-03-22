import { PUBLIC_DISCORD_CLIENT_ID, PUBLIC_DISCORD_CLIENT_SECRET } from '$env/static/public';
import { saveTokens } from '$lib/helpers/account';
import { DISCORD_TOKEN_URL } from '$lib/helpers/discord';
import { createCookie, getSession, updateSession } from '$lib/helpers/session';

export const handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get('sessionId');

	event.locals.getSession = async () => {
		if (!sessionId) return null;

		let session = await getSession(sessionId);
		if (!session) return null;

		// Check if the session is expired
		if (session.expiresAt <= new Date()) {
			const req = await fetch(DISCORD_TOKEN_URL, {
				method: 'post',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: new URLSearchParams({
					client_id: PUBLIC_DISCORD_CLIENT_ID,
					client_secret: PUBLIC_DISCORD_CLIENT_SECRET,
					grant_type: 'refresh_token',
					refresh_token: session.user.refreshToken
				})
			});

			const res = await req.json();
			await saveTokens({
				userId: session.userId,
				accessToken: res.access_token,
				refreshToken: res.refresh_token
			});

			// Update current session
			session = {
				...session,
				...(await updateSession(sessionId, new Date(Date.now() + res.expires_in * 1000)))
			};
			createCookie({
				cookies: event.cookies,
				sessionId: session.id,
				expiresAt: session.expiresAt
			});
		}

		return session;
	};

	return await resolve(event);
};
