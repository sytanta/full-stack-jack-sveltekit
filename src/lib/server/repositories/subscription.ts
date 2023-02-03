import type { Subscription } from '$lib/types';

import prisma from '$lib/prisma';

export async function createOrUpdateSubscription(data: Subscription) {
	return await prisma.subscription.upsert({
		where: {
			stripeId: data.stripeId
		},
		create: {
			userId: data.userId,
			stripeId: data.stripeId,
			stripeStatus: data.stripeStatus,
			stripePriceId: data.stripePriceId,
			quantity: data.quantity,
			trialEndsAt: data.trialEndsAt,
			endsAt: data.endsAt,
			lastEventDate: data.lastEventDate,
			startDate: data.startDate
		},
		update: {
			stripeStatus: data.stripeStatus,
			stripePriceId: data.stripePriceId,
			quantity: data.quantity,
			trialEndsAt: data.trialEndsAt,
			endsAt: data.endsAt,
			lastEventDate: data.lastEventDate,
			startDate: data.startDate
		}
	});
}

export async function getSubscriptionById(stripeId: string) {
	return await prisma.subscription.findFirst({
		where: {
			stripeId
		}
	});
}
