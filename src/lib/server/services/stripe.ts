import Stripe from 'stripe';

import type { AppUser, Subscription } from '$lib/types';

import { STRIPE_SECRET_KEY } from '$env/static/private';
import { PUBLIC_APP_DOMAIN, PUBLIC_STRIPE_PRO_MEMBERSHIP_KEY } from '$env/static/public';

import { getUserByStripeCustomerId } from '$lib/server/repositories/user';
import {
	createOrUpdateSubscription,
	getSubscriptionById
} from '$lib/server/repositories/subscription';

const stripe = new Stripe(STRIPE_SECRET_KEY, null);

export async function getSubscribeUrl(user: AppUser) {
	const customerEmail = user.email;

	const price = await stripe.prices.retrieve(PUBLIC_STRIPE_PRO_MEMBERSHIP_KEY);

	let shouldUpdateUser = false;

	if (!user.stripeCustomerId) {
		shouldUpdateUser = true;

		const customer = await stripe.customers.create({ email: customerEmail! });

		user.stripeCustomerId = customer.id;
	}

	const session = await stripe.checkout.sessions.create({
		billing_address_collection: 'auto',
		line_items: [
			{
				price: price.id,
				quantity: 1
			}
		],
		mode: 'subscription',
		success_url: `${PUBLIC_APP_DOMAIN}/subscribe/success?session_id={CHECKOUT_SESSION_ID}`,
		cancel_url: `${PUBLIC_APP_DOMAIN}/subscribe`,
		customer: user.stripeCustomerId
	});

	return { url: session.url, user, shouldUpdateUser };
}

export async function handleSubscriptionBilling(sessionId: string) {
	const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId);
	const portalSession = await stripe.billingPortal.sessions.create({
		customer: checkoutSession.customer as string,
		return_url: PUBLIC_APP_DOMAIN
	});

	return portalSession.url;
}

export async function handleSubscriptionChange(
	subscription: Stripe.Subscription,
	lastEventDate: number
) {
	const localSubscription = await getSubscriptionById(subscription.id);

	if (localSubscription?.lastEventDate && localSubscription.lastEventDate > lastEventDate) {
		return true;
	}

	const stripeCustomerId = subscription.customer;

	const user = await getUserByStripeCustomerId(stripeCustomerId as string);

	const data = {
		userId: user?.id,
		name: subscription.id,
		stripeId: subscription.id,
		stripeStatus: subscription.status,
		stripePriceId: subscription.items.data[0].price.id,
		quantity: subscription.description,
		trialEndsAt: subscription.trial_end,
		endsAt: subscription.ended_at,
		startDate: subscription.start_date,
		lastEventDate: lastEventDate
	};

	await createOrUpdateSubscription(data as Subscription);

	return true;
}
