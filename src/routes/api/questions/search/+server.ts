import { json } from '@sveltejs/kit';

import type { RequestHandler } from './$types';

import { searchQuestions } from '$lib/server/repositories/questionAnswer';
import { getUserById } from '$lib/server/repositories/user';

export const GET: RequestHandler = async function ({ url }) {
	const searchTerm = url.searchParams.get('term') || '';

	const questions = await searchQuestions(searchTerm);

	const questionsWithAuth = await Promise.all(
		questions.map(async (question) => {
			const user = await getUserById(question.authorId);
			return { ...question, authName: '@' + user?.username };
		})
	);

	return json({ success: true, questions: questionsWithAuth });
};
