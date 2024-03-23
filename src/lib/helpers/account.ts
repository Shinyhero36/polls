import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import type { User } from '$lib/types';
import { eq } from 'drizzle-orm';

export const upsertUser = async (user: User) => {
	const [newUser] = await db
		.insert(users)
		.values({
			id: user.id,
			avatar: user.avatar,
			username: user.username,
			accessToken: user.accessToken,
			refreshToken: user.refreshToken
		})
		.onConflictDoUpdate({
			target: users.id,
			set: {
				avatar: user.avatar,
				username: user.username,
				accessToken: user.accessToken,
				refreshToken: user.refreshToken
			}
		})
		.returning();

	return newUser;
};

export const saveTokens = async ({
	userId,
	accessToken,
	refreshToken
}: {
	userId: string;
	accessToken: string;
	refreshToken: string;
}) => {
	await db
		.update(users)
		.set({
			accessToken,
			refreshToken
		})
		.where(eq(users.id, userId));
};

export const getPublicInfoAboutAccount = async (userId: string) => {
	return await db.query.users.findFirst({
		where: ({ id }, { eq }) => eq(id, userId),
		columns: {
			id: true,
			avatar: true,
			username: true
		}
	});
};
