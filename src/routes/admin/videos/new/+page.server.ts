import { error, redirect, type Actions } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

import { createVideo } from '$lib/server/repositories/video';
import { getTopics } from '$lib/server/repositories/topic';

export const load: PageServerLoad = async function load({ locals }) {
	if (!locals.user) throw redirect(307, '/');

	const topics = await getTopics();

	return { topics };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const formData: Record<string, any> = {};
		const {
			url,
			'host-id': host_id,
			title,
			subtitle,
			'topic-id': topicId
		} = Object.entries(data).reduce((acc, [key, value]) => {
			if (typeof key === 'string') acc[key] = String(value);
			return acc;
		}, formData);

		// const url = String(data.get('url'));
		// const host_id = String(data.get('host-id'));
		// const title = String(data.get('title'));
		// const subtitle = String(data.get('subtitle'));
		// const topicId = Number(data.get('topic-id'));

		// Validate video data
		// return fail(422, { errors });

		const { error: errorDB } = await createVideo({
			url,
			host_type: 'youtube',
			host_id, // video's id
			title,
			subtitle,
			topicId
			// description,
			// image
		});

		if (errorDB) throw error(500, { message: 'Error creating video' });

		throw redirect(307, '/videos');
	}
};
