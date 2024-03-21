import { createAccount, createSession, isEmailAlreadyTaken } from '$lib/helpers/account';
import { hash } from '$lib/helpers/password';
import { createAccountSchema } from '$lib/validations/account';
import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	const session = await locals.getSession();
	if (session) throw redirect(302, '/');
};

export const actions = {
	default: async ({ request, cookies }) => {
		// Get form data
		const formData = await request.formData();
		const nickname = formData.get('nickname')?.toString();
		const email = formData.get('email')?.toString();
		const password = formData.get('password')?.toString();

		// Validate form data
		const account = createAccountSchema.safeParse({
			nickname,
			email,
			password
		});
		if (!account.success) {
			const errors = account.error.flatten().fieldErrors;
			return fail(400, {
				nickname: errors.nickname ? errors.nickname[0] : undefined,
				email: errors.email ? errors.email[0] : undefined,
				password: errors.password ? errors.password[0] : undefined
			});
		}

		// Check if email is already taken
		const isTaken = await isEmailAlreadyTaken(account.data.email);
		if (isTaken) {
			return fail(400, {
				nickname: undefined,
				email: 'This email is already taken',
				password: undefined
			});
		}

		// Create account
		const hashedPassword = await hash(account.data.password);
		const { id: accountId } = await createAccount({
			...account.data,
			password: hashedPassword
		});

		// Attach session to account
		await createSession(accountId, cookies);

		// Redirect to app
		throw redirect(302, '/');
	}
};
