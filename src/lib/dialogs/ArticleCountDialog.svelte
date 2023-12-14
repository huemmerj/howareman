<script lang="ts">
	import CancleButton from '$lib/buttons/CancleButton.svelte';
	import Dialog from './Dialog.svelte';
	import Counter from '$lib/buttons/Counter.svelte';
	import Searchbox from '$lib/Searchbox.svelte';
	import ArticleItem from '$lib/article/ArticleItem.svelte';
	import { onMount } from 'svelte';
	import { scannedArticleNumber } from '../../Store';
	import A from '$lib/buttons/A.svelte';
	import SaveButton from '$lib/buttons/SaveButton.svelte';

	export let showModal: Boolean;

	export let dialog: HTMLDialogElement;

	$: articles = [];

	$: articleNumber = '';
	onMount(() => {
		scannedArticleNumber.subscribe(async(e) => {
			if (!e) return;
			const res = await fetch(`/article?articleNumber=${e}`);
			articles = await res.json();
			articleNumber = e as string
			scannedArticleNumber.set('');
		});
	});
	const onSearched = async (e: CustomEvent<string>) => {
		const res = await fetch(`/article?name=${e.detail}`);
		articles = await res.json();
	}
</script>

<Dialog bind:dialog on:close={() => console.log('closed')} bind:showModal>
	<div slot="header">
		<p class="text-text1">Artikel zählen</p>
	</div>
	<div slot="body">
		<div class="pb-2.5">
			<Searchbox showSearchButton={false} on:search={onSearched}/>
		</div>
		<div class="flex flex-col gap-5 max-h-80 overflow-y-scroll">

		{#each articles as article}
			<ArticleItem
				{article}
				small={true}
				showCounter={true}
			/>
		{/each}
			</div>
	</div>
	<div slot="footer">
		<CancleButton on:click={() => dialog.close()} />
		<SaveButton />
	</div>
</Dialog>
