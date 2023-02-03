<script lang="ts">
	import type { ActionResult } from '@sveltejs/kit';
	import type { Question } from '@prisma/client';

	import { applyAction, deserialize } from '$app/forms';

	import Tiptap from '$lib/components/Tiptap.svelte';

	type QuestionWithAuthor = Question & { authName: string };

	export let questions: QuestionWithAuthor[] = [];

	let searchTerm = '';

	const handleSubmit: EventListener = async function (e) {
		if (searchTerm.length <= 3) return;

		const response = await fetch(`${(e.target as HTMLFormElement)?.action}?term=${searchTerm}`);

		const deserialized = deserialize(await response.text());
		const result = deserialized as ActionResult & {
			questions: QuestionWithAuthor[];
		};

		await applyAction(result);

		questions = result.questions || [];
	};
</script>

<div class="w-full md:w-1/3">
	<div>
		<div class="flex m-5">
			<label
				for="search-dropdown"
				class="mb-2 text-sm font-medium text-slate-900 sr-only dark:text-gray-300"
			>
				Search Questions
			</label>
			<div class="relative w-full">
				<form method="post" action="/api/questions/search" on:submit|preventDefault={handleSubmit}>
					<input
						type="search"
						bind:value={searchTerm}
						id="search-dropdown"
						name="search-term"
						class="block p-2.5 w-full z-20 text-sm text-slate-900 bg-slate-50 rounded-lg border-solid border-2 border-indigo-600 dark:bg-gray-900 dark:text-gray-300"
						placeholder="Search questions..."
					/>
					<button
						type="submit"
						class="absolute top-0 right-0 p-2.5 text-sm font-medium dark:text-white"
					>
						<svg
							class="w-5 h-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					</button>
				</form>
			</div>
		</div>
	</div>

	{#each questions as question (question.id)}
		{#if question}
			<a
				class="flex flex-column justify-cente hover:scale-110 tranition duration-500"
				href={`/ask-jack/question/${question.id}`}
			>
				<div class="max-w-xxl w-full p-4">
					<div class="p-8 bg-white dark:bg-black rounded-lg shadow-md">
						<div class="flex justify-end mb-1 dark:text-gray-300">
							{question.authName}
						</div>
						<Tiptap bind:value={question.description} editable={false} />
					</div>
				</div>
			</a>
		{/if}
	{/each}
</div>
