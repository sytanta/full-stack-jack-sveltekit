<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	import { userStore } from '$lib/stores/userStore';

	let userActions: SVGPathElement | null = null;
	let hideActions = true;
	let isLoggedIn = false;

	function hideUserActions(e: Event) {
		if (e.target === userActions) return (hideActions = !hideActions);
		hideActions = true;
	}

	const onLogout: SubmitFunction = function () {
		return async ({ result }) => {
			if (result.type === 'success') {
				invalidateAll();
			}
		};
	};

	$: isLoggedIn = !!$userStore;
</script>

<svelte:body on:click={hideUserActions} />

<div class="items-center relative hidden md:flex">
	<button class="block">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="currentColor"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-6 h-6 dark:text-white hover:dark:text-green-400 hover:text-green-400"
		>
			<path
				bind:this={userActions}
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
			/>
		</svg>
	</button>

	<ul
		class={`dropdown-menu min-w-max absolute right-0 top-full bg-white text-base z-100 float-left py-2 list-none text-left rounded-lg shadow-lg m-0 bg-clip-padding border-none ${
			hideActions ? 'hidden' : ''
		}`}
		aria-labelledby="dropdownMenuButton1"
	>
		{#if isLoggedIn}
			<li>
				<form action="/signin?/signout" method="post" use:enhance={onLogout}>
					<button
						type="submit"
						class="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
					>
						Logout
					</button>
				</form>
			</li>
		{:else}
			<li>
				<a
					class="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
					href="/register">Register</a
				>
			</li>
			<li>
				<a
					class="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
					href="/signin"
				>
					Sign In
				</a>
			</li>
		{/if}
	</ul>
</div>
