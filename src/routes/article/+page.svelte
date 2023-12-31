<script lang="ts">
	import Searchbox from '$lib/Searchbox.svelte';
	import ArticleItem from '$lib/article/ArticleItem.svelte';
	import CreateButton from '$lib/buttons/CreateButton.svelte';
	import AddToOrderListDialog from '$lib/dialogs/AddToOrderListDialog.svelte';
	import DeleteDialog from '$lib/dialogs/DeleteDialog.svelte';
	import { onMount } from 'svelte';
	import { scannedArticleNumber } from '../../Store';
	import type Article from '../../models/article';

	import A from '$lib/buttons/A.svelte';
	import LoadingIndicator from '$lib/base/LoadingIndicator.svelte';


	export let data: { data: Article[] };

	let deleteDialog: HTMLDialogElement;
	let addToOrderListDialog: HTMLDialogElement;

	$: showDeleteModal = false;
	$: showAddToOrderListModal = false;

	$: search = '';

	$: articles = data.data;

	$: articleNumber = '';

	$: loading = false;
	// $: loading = 
	let onDeleteConfirm = async (e: CustomEvent) => {
		console.log(e.detail);
		await fetch(`/article/${currentArticle.uuid}`, {
			method: 'DELETE'
		});
		deleteDialog.close();
		showDeleteModal = false;
		await refetch();
		console.log(e);
	};

	let onSearch = async (e: CustomEvent<string>) => {
		search = e.detail;
		loading = true;
		const res = await fetch(`/article?name=${search}`);
		articles = await res.json();
		loading = false;
	};
	let currentArticle: Article;

	const refetch = async () => {
		const res = await fetch('/article');
		articles = await res.json();
	};

	onMount(() => {
		scannedArticleNumber.subscribe(async(e) => {
			if (!e) return;
			loading = true;
			const res = await fetch(`/article?articleNumber=${e}`);
			articles = await res.json();
			loading = false;
			articleNumber = e as string
			scannedArticleNumber.set('');
		});
	});
</script>

<div class="p-5 flex-row">
	<h1 class="text-3xl pt-5 pb-2.5">Artikel</h1>
	<Searchbox on:search={onSearch} showSearchButton={false}/>
	<div class="flex justify-end pt-5 pb-2.5">
		<CreateButton href="article/create" />
	</div>
	<div class="flex flex-col gap-5">
		{#if loading}
			<LoadingIndicator />
		{:else if articles && articles.length > 0}
			{#each articles as article}
				<ArticleItem
					on:delete={() => {
						currentArticle = article;
						showDeleteModal = true;
					}}
					on:addToOrderList={() => (showAddToOrderListModal = true)}
					{article}
				/>
			{/each}
		{:else}
			<A href={`article/create?articleNumber=${articleNumber}`}>{articleNumber? `Artikel mit der Artikelnummer ${articleNumber} anlegen`: 'Artikel anlegen'}</A>
		{/if}
	</div>
	<DeleteDialog
		bind:dialog={deleteDialog}
		bind:showModal={showDeleteModal}
		on:delete={onDeleteConfirm}
		headline="Wollen Sie den Artikel wirklich Löschen?"
	/>
	<AddToOrderListDialog
		bind:dialog={addToOrderListDialog}
		bind:showModal={showAddToOrderListModal}
	/>
</div>
