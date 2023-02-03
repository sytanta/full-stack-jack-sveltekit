<script lang="ts">
	import type { PageData } from './$types';

	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { userStore } from '$lib/stores/userStore';

	import AskJackSidebar from '$lib/components/AskJackSidebar.svelte';
	import QuestionForm from '$lib/components/QuestionForm.svelte';
	import Tiptap from '$lib/components/Tiptap.svelte';
	import AnswerForm from '$lib/components/AnswerForm.svelte';

	export let data: PageData;

	let showEditForm = false;
	let showAnswerForm = false;
	let showDeleted = false;

	function onEditQuestion(event: CustomEvent) {
		data.question.description = event.detail.content;
		showEditForm = false;
	}

	function onEditCancel() {
		showEditForm = false;
	}

	function onPostAnswer() {
		invalidateAll();
		showAnswerForm = false;
	}

	$: isMine = data.question?.authorEmail === $userStore?.email;
</script>

<svelte:head>
	<title>{`Question ${$page.params.id} | Full Stack Jack`}</title>
</svelte:head>

<div class="theme-mode bg-white dark:bg-black">
	<div class="h-32 flex justify-center">
		<div class="flex m-5">
			<img
				class="mx-auto h-24 w-auto"
				src="/images/logo_clear_fsj.png"
				alt="full stack jack logo"
			/>
			<h1 class="py-9 text-center text-5xl font-extrabold text-gray-900 dark:text-gray-400 ml-4">
				Ask Jack
			</h1>
		</div>
	</div>
	<div class="md:flex">
		<AskJackSidebar />

		<div class="md:w-1/3 z-1 flex justify-right relative" />

		<div class="w-full md:w-1/3">
			{#if showDeleted}
				<div class="p-8 text-white bg-lime-600 dark:bg-black rounded shadow-md">
					Question deleted
				</div>
			{/if}

			{#if data.question}
				<div class="flex flex-column justify-center hover:scale-110 transition duration-500">
					<div class="max-w-xxl w-full p-4">
						<div class="p-8 bg-white dark:bg-black rounded shadow-md">
							<div class="flex justify-end mb-1 dark:text-gray-300">
								{data.question.authName}
							</div>

							<!-- <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-300">
								{data.question.title}
							</h2> -->

							{#if !isMine || !showEditForm}
								<Tiptap bind:value={data.question.description} editable={false} />
							{/if}

							{#if isMine && !showEditForm}
								<div class="flex mt-5">
									<button
										on:click={() => (showEditForm = true)}
										class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
									>
										Edit
									</button>
									<form method="post" action="?/delete" use:enhance>
										<input type="hidden" name="questionId" value={$page.params.id} />
										<button
											type="submit"
											class="bg-red-500 ml-3 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
										>
											Delete
										</button>
									</form>
								</div>
							{/if}

							{#if isMine && showEditForm}
								<QuestionForm
									formActionEndpoint="?/edit"
									questionId={String(data.question.id)}
									content={data.question.description}
									submitButtonLabel="Update question"
									on:success={onEditQuestion}
									on:cancel={onEditCancel}
								/>
							{/if}
						</div>
					</div>
				</div>

				{#each data.question.answers as answer}
					<div class="flex flex-column justify-center hover:scale-110 transition duration-500">
						<div class="max-w-xxl w-full p-4">
							<div class="p-5 bg-white dark:bg-slate-900 rounded shadow-md">
								<div class="flex justify-end dark:text-gray-300">
									{answer.authorName}
								</div>
								<p class="dark:text-gray-300">{answer.text}</p>
							</div>
						</div>
					</div>
				{/each}
			{/if}

			{#if !!$userStore && !showAnswerForm}
				<div class="flex justify-end">
					<button
						on:click={() => (showAnswerForm = !showAnswerForm)}
						type="button"
						class="text-white bg-gradient-to-r from-indigo-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-indigo-200 dark:focus:ring-indigo-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
					>
						Answer
					</button>
				</div>
			{/if}

			{#if !!$userStore && showAnswerForm}
				<div>
					<AnswerForm
						formActionEndpoint={`/ask-jack/question/${data.question?.id}?/addAnswer`}
						questionId={String(data.question?.id)}
						on:postAnswer={onPostAnswer}
						on:cancel={() => (showAnswerForm = !showAnswerForm)}
					/>
				</div>
			{/if}
		</div>
	</div>
</div>
