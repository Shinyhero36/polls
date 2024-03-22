import { createPoll, validatePoll } from '$lib/helpers/poll';
import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	const session = await locals.getSession();
	if (!session) throw redirect(302, '/login');
};

export const actions = {
	default: async ({ locals, request }) => {
		const session = await locals.getSession();
		if (!session) throw redirect(302, '/login');

		// Validate form data
		const formData = await request.formData();
		const question = formData.get('question')?.toString();
		const ends_at = formData.get('ends_at')?.toString();
		const options = formData
			.getAll('options')
			.map((option) => option.toString())
			.filter((a) => a);

		const poll = validatePoll.safeParse({
			question,
			ends_at,
			options
		});
		if (!poll.success) {
			const errors = poll.error.flatten().fieldErrors;
			console.log('ERRORS:', errors);
			return fail(400, {
				question: errors.question ? errors.question[0] : undefined,
				options: errors.options ? errors.options : undefined
			});
		}

		const pollId = await createPoll({
			userId: session.userId,
			endsAt: poll.data.ends_at,
			question: poll.data.question,
			options: poll.data.options
		});

		throw redirect(302, `/poll/${pollId}`);
	}
};
