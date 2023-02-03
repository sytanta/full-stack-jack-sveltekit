import prisma from '$lib/prisma';

export async function getSeriesByTopicId(topicId: number) {
	return await prisma.series.findMany({
		where: {
			topicId: {
				equals: topicId
			}
		}
	});
}
