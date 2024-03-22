import { PUBLIC_DISCORD_CLIENT_ID, PUBLIC_DISCORD_REDIRECT_URI } from '$env/static/public';
import type { RequestHandler } from '@sveltejs/kit';

export const DISCORD_TOKEN_URL = 'https://discord.com/api/oauth2/token';
export const DISCORD_API_ME_URL = 'https://discord.com/api/users/@me';

export const getDiscordOAuth2Url = (state?: string) => {
	return `https://discord.com/oauth2/authorize?client_id=${PUBLIC_DISCORD_CLIENT_ID}&response_type=code&redirect_uri=${PUBLIC_DISCORD_REDIRECT_URI}&scope=identify+email&state=${state}`;
};
