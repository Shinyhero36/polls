import {
	getFinishedPollsWithVotesAndCreatorInfo,
	getOngoingPollsWithVotesAndCreatorInfo
} from '$lib/helpers/poll';

export const load = async () => {
	const ongoing = await getOngoingPollsWithVotesAndCreatorInfo();

	// Get finished polls
	const finished = await getFinishedPollsWithVotesAndCreatorInfo();

	return {
		ongoing,
		finished
	};
};
