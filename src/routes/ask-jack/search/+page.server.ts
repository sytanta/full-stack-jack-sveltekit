import type { Question } from '@prisma/client';
import type { PageServerLoad } from './$types';

import { searchQuestions } from '$lib/server/repositories/questionAnswer';
import { getUserById } from '$lib/server/repositories/user';

export const load: PageServerLoad = async function () {
	const questions = await searchQuestions('');

	const questionsWithAuth: Question[] = await Promise.all(
		questions.map(async (question) => {
			const user = await getUserById(question.authorId);
			return { ...question, authName: '@' + user?.username };
		})
	);

	return { questions: questionsWithAuth };
};
