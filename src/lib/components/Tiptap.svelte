<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';

	export let editable = true;
	export let value = '';

	let element: HTMLDivElement;
	let editor: Editor;

	onMount(() => {
		editor = new Editor({
			element: element,
			editable,
			extensions: [StarterKit],
			content: value,
			editorProps: {
				attributes: {
					class:
						'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none rounded-lg p-5 bg-slate-100 dark:bg-gray-900 dark:text-white'
				}
			},
			onTransaction: () => {
				// Force re-render so `editor.isActive` works as expected
				editor = editor;
			},
			onUpdate: ({ editor }) => {
				value = editor.getHTML();
			}
		});
	});

	onDestroy(() => {
		editor && editor.destroy();
	});
</script>

{#if editor && editable}
	<div class="px-5 flex gap-3">
		<button
			type="button"
			class="text-gray-500 px-1 dark:text-white"
			on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
			class:active={editor.isActive('heading', { level: 1 })}
		>
			H1
		</button>
		<button
			type="button"
			class="text-gray-500 dark:text-white"
			on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
			class:active={editor.isActive('heading', { level: 2 })}
		>
			H2
		</button>
		<button
			type="button"
			class="text-gray-500 px-1 dark:text-white"
			on:click={() => editor.chain().focus().setParagraph().run()}
			class:active={editor.isActive('paragraph')}
		>
			P
		</button>
	</div>
{/if}

<div bind:this={element} />

<style>
	button.active {
		background: black;
		color: white;
	}

	:deep(.prose) h1 {
		color: white;
	}
</style>
