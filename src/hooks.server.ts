import type { Handle, RequestEvent, ResolveOptions } from '@sveltejs/kit';

import { getUserBySessionToken } from '$lib/server/services/session';

export const handle: Handle = async function handle({ event, resolve }) {
	// Get & set ui theme mode from cookie
	const themeMode = event.cookies.get('theme_mode') || '';
	const transformPageChunk = ({ html }: { html: string }) =>
		html.replace('%sveltekit.theme%', themeMode);

	// Common arguments
	const args: [RequestEvent, ResolveOptions] = [event, { transformPageChunk }];

	// Get auth_token from cookie
	const authToken = event.cookies.get('auth_token');
	if (!authToken) {
		return await resolve(...args);
	}

	// Set user if found
	// TODO - cache with redis
	const user = await getUserBySessionToken(authToken);
	if (!user) {
		return await resolve(...args);
	}

	event.locals.user = user;

	const response = await resolve(...args);
	return response;
};
