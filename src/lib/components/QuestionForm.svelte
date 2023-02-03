<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { enhance, type SubmitFunction } from '$app/forms';

	import Tiptap from './Tiptap.svelte';

	export let formActionEndpoint = '';
	export let questionId = '';
	export let content = '';
	export let submitButtonLabel = 'Ask question';

	const emit = createEventDispatcher();
	let isEditable = true;

	const onPostQuestion: SubmitFunction = function () {
		return async ({ result, update }) => {
			if (result.type === 'success') {
				return emit('success', { questionId: result.data?.question?.id ?? questionId, content });
			}
			if (result.type === 'redirect') {
				update();
			}
		};
	};

	function onCancel() {
		emit('cancel');
	}
</script>

<form method="post" action={formActionEndpoint} use:enhance={onPostQuestion}>
	<Tiptap bind:value={content} editable={isEditable} />
	<input type="hidden" name="questionId" value={questionId} />
	<input type="hidden" name="content" value={content} />

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
			{submitButtonLabel}
		</button>
	</div>
</form>
