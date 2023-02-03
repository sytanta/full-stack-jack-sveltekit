import { writable } from 'svelte/store';

import type { AppUserFrontend } from '$lib/types';

export const userStore = writable<AppUserFrontend>(null);

export function setUserStore(user: AppUserFrontend) {
	userStore.set(user);
}
