<script lang="ts">
	import type { ActionResult } from '@sveltejs/kit';

	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	let sessionId = $page.url.searchParams.get('session_id');

	function handleBilling() {
		return async ({ result }: { result: ActionResult }) => {
			if (result.type === 'success' && result.data?.billingPortalUrl) {
				window.location.href = result.data?.billingPortalUrl;
			}
		};
	}
</script>

<div>
	{#if sessionId}
		<div class="flex py-60 flex-col h-screen my-auto items-center bgimg bg-cover">
			<button class="mt-2 bg-white font-bold py-1 px-8 rounded m-2 dark:bg-black dark:text-white">
				You are subscribed!
			</button>
			<form method="POST" use:enhance={handleBilling}>
				<input type="hidden" id="session-id" name="sessionId" bind:value={sessionId} />
				<button
					class="w-full text-white bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:focus:ring-indigo-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
					id="checkout-and-portal-button"
					type="submit"
				>
					Manage your subscription
				</button>
			</form>
		</div>
	{:else}
		<div>Loading...</div>
	{/if}
</div>
