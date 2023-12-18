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
	import type StockTaking from '../../models/stockTaking';
	import type Article from '../../models/article';
	import { get } from 'svelte/store';

	export let showModal: Boolean;

	export let dialog: HTMLDialogElement;

	export let stockTaking: StockTaking;

	$: articleNumber = '';
	$: articles = [] as Article[];

	onMount(() => {
		scannedArticleNumber.subscribe(async(e) => {
			if (!e) return;
			const res = await fetch(`/article?articleNumber=${e}`);
			articles = await res.json();
			scannedArticleNumber.set('');
			articleNumber = e as string
		});
	});
	const onSearched = async (e: CustomEvent<string>) => {
		const res = await fetch(`/article?name=${e.detail}`);
		articles = await res.json();
	}

	$: changedArticles = [] as {uuid: string, count: number, name: string}[];

	const getArticleCount = (uuid: string) => {
		return stockTaking.articles?.find((a: Article) => a.uuid === uuid);
	};
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
				count={getArticleCount(article.uuid)?.count}
				on:count={(e) => {
					if (changedArticles.find((a) => a.uuid === article.uuid)) {
						changedArticles = changedArticles.map((a) => {
							if (a.uuid === article.uuid) {
								return {uuid: article.uuid, count: e.detail, name: article.name};
							}
							return a;
						});
						return;
					} else {
						changedArticles = [...changedArticles, {uuid: article.uuid, count: e.detail, name: article.name}];
					}
				}}
			/>
		{:else}
			<A href={`article/create?articleNumber=${articleNumber}`}>Artikel Anlegen</A>
		{/each}
			</div>
	</div>
	<div slot="footer">
		<CancleButton on:click={() => dialog.close()} />
			<SaveButton on:click={ () => {
				fetch(`/stocktaking/count/${stockTaking.uuid}`, {
					method: 'PUT',
					body: JSON.stringify(changedArticles)
				});
			}}/>
	</div>
</Dialog>
