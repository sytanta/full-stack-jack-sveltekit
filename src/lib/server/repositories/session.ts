import type { Session } from '$lib/types';

import prisma from '$lib/prisma';
import { getUserByAuthToken } from '$lib/server/repositories/user';

export async function createSession(sessionData: Session) {
	return await prisma.session.create({
		data: {
			userId: sessionData.userId,
			authToken: sessionData.authToken
		}
	});
}

export async function removeSession(authToken: string) {
	await prisma.session.update({
		where: { authToken },
		data: {
			deletedAt: new Date()
		}
	});
}

export async function getSessionByAuthToken(authToken: string) {
	const user = await getUserByAuthToken(authToken);

	return { authToken, user };
}
