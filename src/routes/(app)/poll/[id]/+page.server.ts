import { getPublicInfoAboutAccount } from '$lib/helpers/account';
import { getPollMessages } from '$lib/helpers/message';
import { getPollWithOptionsAndVotes, sendMessage, vote } from '$lib/helpers/poll';
import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ params, locals }) => {
	const session = await locals.getSession();
	const pollId = params.id;

	const poll = await getPollWithOptionsAndVotes(pollId);

	if (!poll)
		return fail(404, {
			message: 'This poll does not exist.'
		});

	const messages = await getPollMessages(poll.id);

	return {
		poll,
		messages,
		session
	};
};

export const actions = {
	vote: async ({ params, locals, request }) => {
		const session = await locals.getSession();
		if (!session)
			return fail(401, {
				message: 'Unauthorized'
			});

		const pollId = params.id;

		const formData = await request.formData();
		const optionId = formData.get('optionId')?.toString();

		if (!optionId)
			return fail(400, {
				message: 'Option ID is required.'
			});

		await vote(optionId, session.userId);

		throw redirect(302, `/poll/${pollId}`);
	},
	message: async ({ params, locals, request }) => {
		const session = await locals.getSession();
		if (!session)
			return fail(401, {
				message: 'Unauthorized'
			});

		const pollId = params.id;

		const formData = await request.formData();
		const message = formData.get('message')?.toString();

		if (!message)
			return fail(400, {
				message: 'Message is required.'
			});

		await sendMessage(pollId, message, session.userId);
		const info = await getPublicInfoAboutAccount(session.userId);
		return info;
	}
};
