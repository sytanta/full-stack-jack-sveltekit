import type { AnswerPost, QuestionPost } from '$lib/types';

import prisma from '$lib/prisma';

export async function createQuestion(data: QuestionPost, authorId: number) {
	return await prisma.question.create({
		data: {
			authorId: authorId,
			title: data.title,
			description: data.description
		}
	});
}

export async function findQuestion(id: number) {
	return await prisma.question.findUnique({
		where: {
			id: id
		},
		include: {
			answers: true
		}
	});
}

export async function createAnswer(data: AnswerPost, authorId: number) {
	return await prisma.answer.create({
		data: {
			authorId: authorId,
			questionId: data.questionId,
			text: data.text
		}
	});
}

export async function searchQuestions(query: string) {
	return await prisma.question.findMany({
		where: {
			OR: [
				{
					title: {
						contains: query
					}
				},
				{
					description: {
						contains: query
					}
				}
			]
		}
	});
}

export async function editQuestion(question: QuestionPost) {
	return await prisma.question.update({
		where: {
			id: question.id
		},
		data: {
			title: question.title,
			description: question.description
		}
	});
}

export async function deleteQuestion(questionId: number) {
	return await prisma.question.delete({
		where: {
			id: questionId
		}
	});
}
