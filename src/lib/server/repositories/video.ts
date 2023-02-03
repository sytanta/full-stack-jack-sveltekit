import type { VideoData } from '$lib/types';

import prisma from '$lib/prisma';

export async function createVideo(data: VideoData) {
	return await prisma.video
		.create({
			data
		})
		.then((video) => ({ video, error: null }))
		.catch((error) => ({ video: null, error }));
}

export async function getVideosBySeriesId(seriesId: number) {
	return await prisma.video.findMany({
		where: {
			seriesId: {
				equals: seriesId
			}
		}
	});
}

export async function getVideosByTopicId(topicId: number) {
	return await prisma.video.findMany({
		where: {
			topicId: {
				equals: topicId
			}
		}
	});
}
