<script lang="ts">
	import type { PageData } from './$types';

	import TopicCard from '$lib/components/TopicCard.svelte';

	export let data: PageData;

	function getColor(accentColor: string | null) {
		switch (accentColor) {
			case 'green':
				return 'hover:dark:shadow-green-400  hover:shadow-green-400';
			case 'red':
				return 'hover:dark:shadow-red-400  hover:shadow-red-400';
			case 'indigo':
				return 'hover:dark:shadow-indigo-400  hover:shadow-indigo-400';
			default:
				return '';
		}
	}
</script>

<svelte:head>
	<title>Turorials | Full Stack Jack</title>
</svelte:head>

{#if data.topics?.length}
	<div aria-label="Group of cards" class="py-8 w-full">
		{#each data.topics as row}
			<div class="lg:flex items-center justify-center w-full">
				{#each row as topic}
					<div
						class={`lg:w-4/12 lg:m-7 md:h-108  lg:mb-0 mb-7 dark:bg-gray-900 bg-white p-6 shadow rounded transition duration-500 hover:scale-110 dark:hover:shadow-xl hover:shadow-xl ${getColor(
							topic.accentColor
						)}`}
					>
						<TopicCard {topic} />
					</div>
				{/each}
			</div>
		{/each}
	</div>
{/if}
