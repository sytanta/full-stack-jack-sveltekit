import { error, redirect, type Actions } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

import {
	createAnswer,
	deleteQuestion,
	editQuestion,
	findQuestion
} from '$lib/server/repositories/questionAnswer';
import { getUserById } from '$lib/server/repositories/user';

export const load: PageServerLoad = async function ({ params }) {
	const questionId = parseInt(params.id);

	const question = await findQuestion(questionId);

	if (!question) throw redirect(302, '/ask-jack/search');

	const answers = await Promise.all(
		question.answers.map(async (answer) => {
			const user = await getUserById(answer.authorId);
			return { ...answer, authorName: '@' + user?.username };
		})
	);

	const user = await getUserById(question.authorId);

	return {
		question: { ...question, answers, authName: '@' + user?.username, authorEmail: user?.email }
	};
};

export const actions: Actions = {
	delete: async ({ request, locals }) => {
		if (!locals.user) throw error(401, { message: 'Unauthorized' });

		const data = await request.formData();
		const questionId = parseInt(String(data.get('questionId')));

		const question = await findQuestion(questionId);

		if (!question) throw error(404, { message: 'Question not found' });

		if (locals.user.id !== question.authorId) {
			throw error(403, { message: 'Only question creator can delete his own question' });
		}

		await deleteQuestion(question.id);

		throw redirect(303, '/ask-jack/search');
	},

	edit: async ({ request, locals }) => {
		if (!locals.user) throw error(401, { message: 'Unauthorized' });

		const data = await request.formData();
		const questionId = parseInt(String(data.get('questionId')));
		const newContent = data.get('content');

		const question = await findQuestion(questionId);

		if (!question) throw error(404, { message: 'Question not found' });

		if (locals.user.id !== question.authorId) {
			throw error(403, { message: 'Only question creator can edit his own question' });
		}

		question.description = String(newContent);

		await editQuestion(question);

		return {};
	},

	addAnswer: async ({ request, locals }) => {
		if (!locals.user) throw error(401, { message: 'Unauthorized' });

		const data = await request.formData();
		const questionId = parseInt(String(data.get('questionId')));
		const content = String(data.get('content'));

		if (!questionId) throw error(404, { message: 'Question not found' });

		const question = await findQuestion(questionId);

		if (!question) throw error(404, { message: 'Question not found' });

		const answer = await createAnswer({ questionId, text: content }, locals.user.id);

		return { answer: { ...answer, authorName: '@' + locals.user.username } };
	}
};
