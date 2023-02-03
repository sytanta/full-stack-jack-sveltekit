import type { PageServerLoad } from './$types';

import { getTopicIdByName } from '$lib/server/repositories/topic';
import { getVideosByTopicId } from '$lib/server/repositories/video';
import { getSeriesByTopicId } from '$lib/server/repositories/series';

export const load: PageServerLoad = async function ({ params }) {
	const topicName = params.name;

	const topic = await getTopicIdByName(topicName);

	if (!topic) return { series: [], videos: [], topic: null };

	const series = await getSeriesByTopicId(topic.id);
	const videos = await getVideosByTopicId(topic.id);

	return { series, videos, topic };
};
