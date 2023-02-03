import type { Actions } from '@sveltejs/kit';

import { handleSubscriptionBilling } from '$lib/server/services/stripe';

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const sessionId = data.get('sessionId');

		const billingPortalUrl = await handleSubscriptionBilling(String(sessionId));

		return { billingPortalUrl };
	}
};
