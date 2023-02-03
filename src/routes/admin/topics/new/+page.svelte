<script lang="ts">
	import { enhance } from '$app/forms';

	let name = '';
	let displayName = '';
	let showName = true;
	let image = '';
	let accentColor = 'green';
</script>

<svelte:head>
	<title>Create new topic | Full Stack Jack</title>
</svelte:head>

<div class="dark:bg-black h-screen">
	<div class="flex items-center justify-center px-4 sm:px-6 lg:px-8">
		<div class="max-w-md w-full">
			<div>
				<h2 class="text-center text-3xl font-extrabold mt-5 text-gray-900 dark:text-white">
					Create topic
				</h2>
			</div>
			<!-- {#if errors}
				<div
					class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-3"
					role="alert"
				>
					<ul class="block sm:inline">
						{#each Object.keys(errors) as key}
							<li>
								{errors[key].message}
							</li>
						{/each}
					</ul>
				</div>
			{/if} -->
			<form class="mt-8 space-y-6" method="POST" use:enhance>
				<input type="hidden" name="remember" value="true" />
				<div class="rounded-md shadow-sm -space-y-px mb-1">
					<div>
						<label for="name" class="sr-only">Name</label>
						<input
							bind:value={name}
							id="name"
							name="name"
							required
							class={`appearance-none dark:bg-slate-500 dark:text-white dark:placeholder-white rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
							placeholder="Name"
						/>
					</div>
				</div>
				<div class="rounded-md shadow-sm -space-y-px mb-1">
					<div>
						<label for="display-name" class="sr-only">Display name</label>
						<input
							bind:value={displayName}
							id="display-name"
							name="display-name"
							required
							class={`dark:bg-slate-500 dark:text-white dark:placeholder-white appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
							placeholder="Display name"
						/>
					</div>
				</div>
				<div class="rounded-md shadow-sm -space-y-px mb-1">
					<div>
						<label for="display-name">Show name</label>
						<input
							type="checkbox"
							bind:checked={showName}
							id="show-name"
							name="show-name"
							class={`dark:bg-slate-500 dark:text-white dark:placeholder-white appearance-none rounded-none relative px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
						/>
					</div>
				</div>
				<div class="rounded-md shadow-sm -space-y-px mb-1">
					<div>
						<label for="image" class="sr-only">Image</label>
						<input
							bind:value={image}
							id="image"
							name="image"
							required
							class={`dark:bg-slate-500 dark:text-white dark:placeholder-white appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
							placeholder="Image url"
						/>
					</div>
				</div>
				<div class="rounded-md shadow-sm -space-y-px mb-1">
					<div>
						<label for="accent-color">Accent color</label>
						<select bind:value={accentColor} id="accent-color" name="accent-color">
							<option value="green">Green</option>
							<option value="red">Red</option>
							<option value="indigo">Indigo</option>
						</select>
					</div>
				</div>

				<button
					type="submit"
					class="mt-5 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					<span class="absolute left-0 inset-y-0 flex items-center pl-3">
						<svg
							class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true"
						>
							<path
								fill-rule="evenodd"
								d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
								clip-rule="evenodd"
							/>
						</svg>
					</span>
					Submit
				</button>
			</form>
		</div>
	</div>
</div>
