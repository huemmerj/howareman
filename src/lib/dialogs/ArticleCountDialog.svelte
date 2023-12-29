<script lang="ts">
	import CancleButton from '$lib/buttons/CancleButton.svelte';
	import Dialog from './Dialog.svelte';
	import Searchbox from '$lib/Searchbox.svelte';
	import ArticleItem from '$lib/article/ArticleItem.svelte';
	import { onMount } from 'svelte';
	import { scannedArticleNumber } from '../../Store';
	import A from '$lib/buttons/A.svelte';
	import SaveButton from '$lib/buttons/SaveButton.svelte';
	import type StockTaking from '../../models/stockTaking';
	import type Article from '../../models/article';
	import { notifications } from '$lib/notifications';
	import LoadingIndicator from '$lib/base/LoadingIndicator.svelte';

	export let showModal: Boolean;

	export let dialog: HTMLDialogElement;

	export let stockTaking: StockTaking;

	$: articleNumber = '';
	$: lastSearched = '';
	$: search = ''
	$: articles = [] as Article[];

	$: loading = false;

	onMount(() => {
		scannedArticleNumber.subscribe(async(e) => {
			if (!e) return;
			articleNumber = e as string;
			fetchByArticleNumber(e);
		});
	});
	const fetchByArticleNumber = async (articleNumber: string) => {
		search = ''
		loading = true;
		const res = await fetch(`/article?articleNumber=${articleNumber}`);
		articles = await res.json();
		loading = false;
		scannedArticleNumber.set('');
	}
	const fetchBySearch = async (search: string) => {
		loading = true;
		const res = await fetch(`/article?name=${search}`);
		articles = await res.json();

		loading = false;
	}
	const onSearched = async (e: CustomEvent<string>) => {
		lastSearched = e.detail;
		articleNumber = '';
		fetchBySearch(e.detail)
	}

	$: changedArticles = [] as {uuid: string, count: number, name: string}[];

	const getArticleCount = (uuid: string) => {
		return stockTaking.articles?.find((a: Article) => a.uuid === uuid);
	};

	const onSave = async () => {
		try {

			const res = await fetch(`/stocktaking/count/${stockTaking.uuid}`, {
				method: 'PUT',
				body: JSON.stringify(changedArticles)
			});
			if (res.status === 201){
				notifications.success('Erfolgreich gespeichert',4000);
			} else {
				notifications.danger('Fehler beim speichern',4000);
			}
		} catch (e) {
			notifications.danger(e.message, 4000);
		} finally {
			refetch();
			if (articleNumber) {fetchByArticleNumber(articleNumber);} else{
				fetchBySearch(lastSearched);
			}
		}
	}
	const refetch = async () => {
		const res = await fetch(`/stocktaking/${stockTaking.uuid}`);
		stockTaking = await res.json();
	}
</script>

<Dialog bind:dialog on:close={() => console.log('closed')} bind:showModal>
	<div slot="header">
		<p class="text-text1">Artikel zählen</p>
	</div>
	<div slot="body">
		<div class="pb-2.5">
			<Searchbox bind:search={search} showSearchButton={false} on:search={onSearched}/>
		</div>
		<div class="flex flex-col gap-5 max-h-80 overflow-y-scroll">
			{#if loading}
			<LoadingIndicator />
			{:else}
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
			{/if}
		</div>
	</div>
	<div slot="footer">
		<CancleButton on:click={() => dialog.close()} />
			<SaveButton on:click={onSave}/>
	</div>
</Dialog>
