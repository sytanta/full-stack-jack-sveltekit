import { error, type Actions } from '@sveltejs/kit';

import { getUserById, updateStripeCustomerId } from '$lib/server/repositories/user';
import { getSubscribeUrl } from '$lib/server/services/stripe';

export const actions: Actions = {
	default: async ({ locals }) => {
		if (!locals.user) throw error(401, { message: 'Unauthorized' });

		const user = await getUserById(locals.user.id);

		if (!user) throw error(401, { message: 'Unauthorized' });

		const { url, user: customer, shouldUpdateUser } = await getSubscribeUrl(user);

		if (shouldUpdateUser) {
			await updateStripeCustomerId(customer);
		}

		return { stripeUrl: url };
	}
};
