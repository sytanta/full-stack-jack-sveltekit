// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Error {}

	interface Locals {
		user: import('$lib/types').AppUser | null;
	}

	interface PageData {
		user: import('$lib/types').AppUserFrontend;
	}

	// interface Platform {}
}
