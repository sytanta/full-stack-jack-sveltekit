<script lang="ts">
	import { goto } from '$app/navigation';

	import AskJackSidebar from '$lib/components/AskJackSidebar.svelte';
	import QuestionForm from '$lib/components/QuestionForm.svelte';

	function onCancel() {
		goto('/ask-jack/search');
	}
</script>

<svelte:head>
	<title>Ask a question | Full Stack Jack</title>
</svelte:head>

<div class="min-h-full theme-mode bg-white dark:bg-black">
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
		<div class="w-full md:w-1/3 h-screen">
			<QuestionForm
				formActionEndpoint="/ask-jack/ask"
				submitButtonLabel="Post question"
				on:cancel={onCancel}
			/>
		</div>
	</div>
</div>
