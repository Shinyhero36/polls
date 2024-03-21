import { createSession, doesCredentialsMatch } from '$lib/helpers/account';
import { loginIntoAccountSchema } from '$lib/validations/account';
import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	const session = await locals.getSession();
	if (session) throw redirect(302, '/');
};

export const actions = {
	default: async ({ request, cookies }) => {
		// Get form data
		const formData = await request.formData();
		const email = formData.get('email')?.toString();
		const password = formData.get('password')?.toString();

		// Validate form data
		const account = loginIntoAccountSchema.safeParse({
			email,
			password
		});
		if (!account.success) {
			const errors = account.error.flatten().fieldErrors;
			return fail(400, {
				email: errors.email ? errors.email[0] : undefined,
				password: errors.password ? errors.password[0] : undefined
			});
		}

		// Check credentials
		const { match, account: user } = await doesCredentialsMatch({
			...account.data
		});
		if (!match || !user) {
			return fail(400, {
				email: 'Invalid email or password',
				password: 'Invalid email or password'
			});
		}

		// Attach session to account
		await createSession(user.id, cookies);

		// Redirect to app
		throw redirect(302, '/');
	}
};
