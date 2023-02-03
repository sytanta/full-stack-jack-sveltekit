import type { Topic } from '@prisma/client';
import type { PageServerLoad } from './$types';

import { getTopics } from '$lib/server/repositories/topic';

export const load: PageServerLoad = async function () {
	const rowSize = 2;
	const rows: Topic[][] = [];
	let i,
		l,
		chunkSize = rowSize;

	const topics = await getTopics();

	for (i = 0, l = topics.length; i < l; i += chunkSize) {
		rows.push(topics.slice(i, i + chunkSize));
	}

	return { topics: rows };
};
