<script lang="ts">
	import type { QuestionWithAuthor } from '$lib/types';
	import type { PageData } from './$types';

	import AskJackSidebar from '$lib/components/AskJackSidebar.svelte';
	import QuestionBoard from '$lib/components/QuestionBoard.svelte';

	export let data: PageData;

	$: questions = (data.questions || []) as QuestionWithAuthor[];
</script>

<svelte:head>
	<title>Ask Jack | Full Stack Jack</title>
</svelte:head>

<div class="min-h-screen theme-mode bg-white dark:bg-black">
	<div class="h-32 flex justify-center">
		<div class="flex m-5">
			<img
				class="mx-auto h-24 w-auto"
				src="/images/logo_clear_fsj.png"
				alt="Full Stack Jack logo"
			/>
			<h1 class="py-9 text-center text-5xl font-extrabold text-gray-900 dark:text-gray-400 ml-4">
				Ask Jack
			</h1>
		</div>
	</div>
	<div class="md:flex min-h-full">
		<AskJackSidebar />
		<div class="md:w-1/3 z-1 flex justify-right relative" />
		<QuestionBoard {questions} />
	</div>
</div>
