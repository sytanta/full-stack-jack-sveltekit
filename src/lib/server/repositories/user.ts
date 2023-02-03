import type { AppUser, AppUserWoId } from '$lib/types';

import prisma from '$lib/prisma';

export async function getUserByEmail(emailOrEmail: string) {
	return await prisma.user.findFirst({
		where: {
			OR: [{ email: emailOrEmail }, { username: emailOrEmail }]
		}
	});
}

export async function getUserByUserName(username: string) {
	return await prisma.user.findUnique({
		where: {
			username: username
		},
		select: {
			id: true,
			username: true
		}
	});
}

export async function getUserByAuthToken(authToken: string) {
	const sessions = await prisma.session.findMany({
		where: {
			authToken,
			OR: [{ deletedAt: null }]
		}
	});

	return sessions.length
		? await prisma.user.findUnique({
				where: {
					id: sessions[0].userId
				}
		  })
		: null;
}

export async function createUser(user: AppUserWoId) {
	const userDB = await prisma.user.create({
		data: {
			username: user.username,
			name: user.name,
			email: user.email,
			loginType: user.loginType,
			password: user.password
		}
	});

	return userDB;
}

export async function getUserById(id: number) {
	return await prisma.user.findUnique({
		where: {
			id
		},
		select: {
			id: true,
			username: true,
			email: true,
			stripeCustomerId: true
		}
	});
}

export async function getUserByStripeCustomerId(stripeCustomerId: string) {
	return await prisma.user.findFirst({
		where: {
			stripeCustomerId
		},
		select: {
			id: true,
			username: true,
			email: true,
			stripeCustomerId: true
		}
	});
}

export async function updateStripeCustomerId(user: AppUser) {
	return await prisma.user.update({
		where: { email: user.email },
		data: {
			stripeCustomerId: user.stripeCustomerId
		}
	});
}
