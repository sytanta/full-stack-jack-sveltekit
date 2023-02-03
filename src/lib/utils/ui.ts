import type { Theme } from '$lib/types';

import { setThemeModeStore } from '$lib/stores/uiStore';

export function updateThemeMode(mode: Theme) {
	// Update global theme store
	setThemeModeStore(mode);

	// Store in localStorage
	localStorage.setItem('theme', mode);

	// Update cookie
	let expires = '';
	const date = new Date();
	date.setTime(date.getTime() + 365 * 24 * 60 * 60 * 1000); // expires in 365 days
	expires = '; expires=' + date.toUTCString();
	document.cookie = 'theme_mode' + '=' + mode + expires + '; path=/';

	// Update html class list
	document.documentElement.classList[mode === 'dark' ? 'add' : 'remove']('dark');
}

export function checkLocalStorageThemeMode() {
	let mode: Theme = 'light';
	const savedMode = localStorage.getItem('theme');

	if (
		savedMode === 'dark' ||
		(savedMode == null && window.matchMedia('(prefers-color-scheme: dark)').matches)
	) {
		mode = 'dark';
	}

	updateThemeMode(mode);
}
