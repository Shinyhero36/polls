import { getPoll } from '$lib/helpers/poll';

export const load = async ({ params }) => {
	const pollId = params.id;

	const poll = await getPoll(pollId);

	return {
		poll
	};
};
