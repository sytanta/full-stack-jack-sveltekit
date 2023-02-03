import type Stripe from 'stripe';

import type { RequestHandler } from './$types';

import { handleSubscriptionChange } from '$lib/server/services/stripe';

export const POST: RequestHandler = async function ({ request }) {
	const stripeEvent: Stripe.Event = await request.json();

	const isSubscriptionEvent = stripeEvent?.type?.startsWith('customer.subscription');

	if (isSubscriptionEvent) {
		handleSubscriptionChange(
			stripeEvent?.data?.object as Stripe.Subscription,
			stripeEvent?.created
		);
	}

	const response = new Response(JSON.stringify({ received: true }));
	response.headers.append('Access-Control-Allow-Origin', '*');

	return response;
};
