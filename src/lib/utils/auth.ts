import type { AppUserFrontend } from '$lib/types';

import { goto } from '$app/navigation';

export function checkRoute(user: AppUserFrontend, pathname: string) {
	if (!!user && ['/signin', '/register'].includes(pathname)) return goto('/');
	if (!user && ['/ask-jack/ask'].includes(pathname)) goto('/ask-jack/search');
}
