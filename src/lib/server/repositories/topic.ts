import type { Topic } from '$lib/types';

import prisma from '$lib/prisma';

export async function createTopic(data: Topic) {
	return await prisma.topic
		.create({ data })
		.then((topic) => ({ topic, error: null }))
		.catch((error) => ({ topic: null, error }));
}

export async function getTopics() {
	return await prisma.topic.findMany();
}

export async function getTopicIdByName(topicName: string) {
	return await prisma.topic.findFirst({
		where: {
			name: {
				equals: topicName
			}
		}
	});
}
