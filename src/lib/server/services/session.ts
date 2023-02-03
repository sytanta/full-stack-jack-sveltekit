import { v4 as uuidv4 } from 'uuid';

import type { AppUser } from '$lib/types';
import type { Cookies } from '@sveltejs/kit';

import {
	createSession,
	getSessionByAuthToken,
	removeSession
} from '$lib/server/repositories/session';

export async function makeSession(user: AppUser, cookies: Cookies) {
	const authToken = uuidv4().replaceAll('-', '');
	const session = await createSession({ authToken, userId: user.id! });
	const userId = session.userId;

	if (userId) {
		cookies.set('auth_token', authToken, { path: '/', httpOnly: true, maxAge: 30 * 24 * 60 * 60 }); // 30 days
		return await getUserBySessionToken(authToken);
	}

	throw Error('Error creating session');
}

export async function deleteSession(cookies: Cookies) {
	const authToken = cookies.get('auth_token');
	if (!authToken) return;

	cookies.delete('auth_token');

	await removeSession(authToken);
}

export async function getUserBySessionToken(authToken: string) {
	const session = await getSessionByAuthToken(authToken);
	return session?.user;
}
