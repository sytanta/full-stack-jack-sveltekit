<script lang="ts">
	import '../lib/styles/global.css';

	import { onMount } from 'svelte';

	import type { LayoutData } from './$types';

	import { afterNavigate } from '$app/navigation';
	import { setUserStore } from '$lib/stores/userStore';
	import { setDrawerOpenStore } from '$lib/stores/uiStore';
	import { checkLocalStorageThemeMode } from '$lib/utils/ui';

	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';

	export let data: LayoutData;

	setUserStore(data.user ?? null);

	afterNavigate(() => {
		setDrawerOpenStore(false);
	});

	onMount(() => {
		checkLocalStorageThemeMode();
	});

	// Watch and update user data from "load()" function
	// which re-runs when "invalidate()" or "invalidateAll()" is called
	$: {
		const user = data.user;
		setUserStore(user);
	}
</script>

<div class="dark:bg-black min-h-screen flex flex-col">
	<Nav />
	<!-- <TheMobileNav /> -->
	<slot />
	<Footer />
</div>
