import type { LayoutServerLoad } from './$types';

import { sanitizeUserForFrontend } from '$lib/server/services/user';

export const load: LayoutServerLoad = function ({ locals }) {
	return {
		user: sanitizeUserForFrontend(locals?.user)
	};
};
