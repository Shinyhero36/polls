import { PUBLIC_DISCORD_CLIENT_ID, PUBLIC_DISCORD_CLIENT_SECRET } from '$env/static/public';
import { upsertUser } from '$lib/helpers/account';
import { DISCORD_API_ME_URL, DISCORD_TOKEN_URL } from '$lib/helpers/discord';
import { createCookie, createSession, deleteSessions } from '$lib/helpers/session';
import { redirect } from '@sveltejs/kit';

export const load = async ({ url, fetch, cookies }) => {
	const code = url.searchParams.get('code');
	const state = url.searchParams.get('state');

	// TODO: Remove hardcoded state
	if (code && state === 'my-state') {
		// Exchange code for token
		const req = await fetch(DISCORD_TOKEN_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams({
				client_id: PUBLIC_DISCORD_CLIENT_ID,
				client_secret: PUBLIC_DISCORD_CLIENT_SECRET,
				code,
				grant_type: 'authorization_code',
				redirect_uri: `${url.origin}/discord/callback`
			})
		});
		const res = await req.json();

		const userReq = await fetch(DISCORD_API_ME_URL, {
			headers: {
				Authorization: `Bearer ${res.access_token}`
			}
		});
		const userRes = await userReq.json();

		// Upsert a user
		const user = await upsertUser({
			id: userRes.id,
			username: userRes.username,
			avatar: userRes.avatar,
			accessToken: res.access_token,
			refreshToken: res.refresh_token
		});

		const session = await createSession(user.id, new Date(Date.now() + res.expires_in * 1000));

		// Set the session cookie
		await createCookie({
			sessionId: session.id,
			expiresAt: session.expiresAt,
			cookies
		});

		// Redirect to '/'
		throw redirect(302, '/');
	}
};
