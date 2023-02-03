import { writable } from 'svelte/store';

export const themeModeStore = writable('light');

export function setThemeModeStore(mode: string | null) {
	if (!mode) mode = 'light';
	if (!['dark', 'light'].includes(mode)) mode = 'light';

	themeModeStore.set(mode);
}

export const appLoadingStore = writable(false);

export function setAppLoadingStore(loading: boolean) {
	appLoadingStore.update((pre) => loading ?? !pre);
}

export const drawerOpenStore = writable(false);

export function setDrawerOpenStore(open: boolean | null) {
	drawerOpenStore.update((pre) => open ?? !pre);
}
