<script lang="ts">
	import CancleButton from '$lib/buttons/CancleButton.svelte';
	import Dialog from './Dialog.svelte';
	import Counter from '$lib/buttons/Counter.svelte';
	import Searchbox from '$lib/Searchbox.svelte';
	import ArticleItem from '$lib/article/ArticleItem.svelte';
	import { onMount } from 'svelte';
	import { scannedArticleNumber } from '../../Store';
	import A from '$lib/buttons/A.svelte';

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
</script>

<Dialog bind:dialog on:close={() => console.log('closed')} bind:showModal>
	<div slot="header">
		<p class="text-text1">Artikel zählen</p>
	</div>
	<div slot="body">
		<div class="pb-2.5">
			<Searchbox showSearchButton={false}/>
		</div>
		<div class="flex flex-col gap-5">

		{#each articles as article}
			<ArticleItem
				{article}
				small={true}
			/>
		{/each}
		<ArticleItem
			article={{uuid:"3", name: 'Test', description: 'Test', articleNumber: '123'}}
			small={true}
		/>
			</div>
	</div>
	<div slot="footer">
		<CancleButton on:click={() => dialog.close()} />
	</div>
</Dialog>
