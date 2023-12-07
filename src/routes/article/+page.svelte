<script lang="ts">
	import ScannButton from '$lib/ScannButton.svelte';
	import Searchbox from '$lib/Searchbox.svelte';
	import ArticleItem from '$lib/article/ArticleItem.svelte';
	import CreateButton from '$lib/buttons/CreateButton.svelte';
	import AddToOrderListDialog from '$lib/dialogs/AddToOrderListDialog.svelte';
	import ArticleScanDialog from '$lib/dialogs/ScanDialog.svelte';
	import DeleteDialog from '$lib/dialogs/DeleteDialog.svelte';
	import type Article from '../../models/article';

	let deleteDialog: HTMLDialogElement;
	let addToOrderListDialog: HTMLDialogElement;
	let articleScanDialog: HTMLDialogElement;

	$: showDeleteModal = false;
	$: showAddToOrderListModal = false;
	$: showArticleScanDialog = false;

	$: search = '';
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

	let onScanned = async (e: CustomEvent<string>) => {
		articleScanDialog.close();
		showArticleScanDialog = false;
		const res = await fetch(`/article?articleNumber=${e.detail}`);
		articles = await res.json();
	};
	let onSearch = async (e: CustomEvent<string>) => {
		console.log(e.detail);
		search = e.detail;
		const res = await fetch(`/article?name=${search}`);
		articles = await res.json();
	};

	export let data: { data: Article[] };
	$: articles = data.data;
	let currentArticle: Article;

	const refetch = async () => {
		const res = await fetch('/article');
		articles = await res.json();
	};
</script>

<div class="p-5 flex-row">
	<h1 class="text-3xl pt-5 pb-2.5">Artikel</h1>
	<Searchbox on:search={onSearch} on:scanned={onScanned}/>
	<div class="flex justify-end pt-5 pb-2.5">
		<CreateButton href="article/create" />
	</div>
	<div class="flex flex-col gap-5">
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
	<ArticleScanDialog
		bind:dialog={articleScanDialog}
		bind:showModal={showArticleScanDialog}
		on:scanned={onScanned}
	/>

	<ScannButton on:click={() => (showArticleScanDialog = true)} />
</div>
