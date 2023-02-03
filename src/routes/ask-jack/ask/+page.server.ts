import { error, redirect, type Actions } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

import { createQuestion } from '$lib/server/repositories/questionAnswer';

export const load: PageServerLoad = async function ({ locals }) {
	if (!locals.user) throw redirect(302, '/ask-jack/search');
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		if (!locals.user) throw error(401, { message: 'Unauthorized' });

		const data = await request.formData();
		const content = String(data.get('content'));

		const question = await createQuestion({ title: '', description: content }, locals.user.id);

		throw redirect(303, `/ask-jack/question/${question.id}`);
	}
};
