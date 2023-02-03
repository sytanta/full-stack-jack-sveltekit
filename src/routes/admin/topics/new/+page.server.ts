import { error, redirect, type Actions } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

import { createTopic } from '$lib/server/repositories/topic';

export const load: PageServerLoad = async function load({ locals }) {
	if (!locals.user) throw redirect(307, '/');
};

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const formData: Record<string, any> = {};
		const {
			name,
			displayName,
			image,
			'accent-color': accentColor
		} = Object.entries(data).reduce((acc, [key, value]) => {
			if (typeof key === 'string') acc[key] = String(value);
			return acc;
		}, formData);

		const showName = !!data.get('show-name');
		const url = image;

		// const name = String(data.get('name'));
		// const displayName = String(data.get('display-name'));
		// const showName = !!data.get('show-name');
		// const image = String(data.get('image'));
		// const url = image;
		// const accentColor = String(data.get('accent-color'));

		// Validate topic data
		// if (false) return fail(422, { errors: {} });

		const { error: errorDB } = await createTopic({
			name,
			displayName: displayName ?? null,
			showName: showName ?? null,
			url,
			image: image ?? null,
			accentColor: accentColor ?? null
		});

		if (errorDB) throw error(500, { message: 'Error creating topic' });

		throw redirect(307, '/topics');
	}
};
