<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let showDialog = true;
	export let dismissText = 'Close';

	const dispatch = createEventDispatcher();

	function closeDIalog() {
		dispatch('close');
	}
</script>

<div
	class={`relative z-10 dark:text-white ${showDialog ? '' : 'hidden'}`}
	aria-labelledby="modal-title"
	role="dialog"
	aria-modal="false"
>
	<div class="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-opacity-90 transition-opacity" />

	<div class="sm:fixed h-3/4  inset-0 z-10 overflow-y-auto">
		<div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
			<div
				class="relative transform overflow-hidden rounded-lg  text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
			>
				<div class="bg-white dark:bg-black px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
					<div class="sm:flex sm:items-start">
						<slot />
					</div>
				</div>
				<div class="dark:bg-black bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
					<button
						type="button"
						on:click={closeDIalog}
						class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 dark:bg-black dark:text-white bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
					>
						{dismissText}
					</button>
				</div>
			</div>
		</div>
	</div>
</div>
