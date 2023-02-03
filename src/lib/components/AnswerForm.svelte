<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { enhance, type SubmitFunction } from '$app/forms';

	export let formActionEndpoint = '';
	export let questionId = '';

	const emit = createEventDispatcher();

	let content = '';

	const onPostAnswer: SubmitFunction = async function ({ data, cancel }) {
		if (!data.get('questionId') || !data.get('content')) cancel();

		return async ({ result }) => {
			if (result.type === 'success') {
				emit('postAnswer', result.data?.answer);
				content = '';
			}
		};
	};

	function onCancel() {
		emit('cancel');
	}
</script>

<form action={formActionEndpoint} method="post" use:enhance={onPostAnswer}>
	<input type="hidden" name="questionId" value={questionId} />
	<label for="content" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
		Answer
	</label>
	<textarea
		bind:value={content}
		id="content"
		name="content"
		rows="4"
		class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
		placeholder="Be specific and kind"
	/>
	<div />
	<div class="flex justify-end">
		<button
			on:click={onCancel}
			type="button"
			class="mt-5 text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:focus:ring-indigo-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
		>
			Cancel
		</button>
		<button
			type="submit"
			class="mt-5 text-white bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:focus:ring-indigo-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
		>
			Submit
		</button>
	</div>
</form>
