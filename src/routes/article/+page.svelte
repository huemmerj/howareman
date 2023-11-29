<script lang="ts">
	import ScannButton from '$lib/ScannButton.svelte';
	import Searchbox from '$lib/Searchbox.svelte';
	import ArticleItem from '$lib/article/ArticleItem.svelte';
	import CreateButton from '$lib/buttons/CreateButton.svelte';
	import AddToOrderListDialog from '$lib/dialogs/AddToOrderListDialog.svelte';
	import ArticleScanDialog from '$lib/dialogs/ArticleScanDialog.svelte';
	import DeleteDialog from '$lib/dialogs/DeleteDialog.svelte';
	import type Article from '../../models/article';

	let deleteDialog: HTMLDialogElement;
	let addToOrderListDialog: HTMLDialogElement;
	let articleScanDialog: HTMLDialogElement;

	$: showDeleteModal = false;
	$: showAddToOrderListModal = false;
	$: showArticleScanDialog = false;

	let onDeleteConfirm = async (e: CustomEvent<string>) => {
		console.log(e.detail);
		await fetch(`/article/${e.detail}`, {
			method: 'DELETE'
		});
		deleteDialog.close();
		showDeleteModal = false;
		await refetch();
		console.log(data);
	};

	let onScanned = (e: CustomEvent<string>) => {
		console.log(e.detail);
		showArticleScanDialog = false;
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
	<Searchbox />
	<div class="flex justify-end pt-5 pb-2.5">
		<CreateButton />
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
		article={currentArticle}
	/>
	<AddToOrderListDialog
		bind:dialog={addToOrderListDialog}
		bind:showModal={showAddToOrderListModal}
	/>
	<ArticleScanDialog
		bind:dialog={articleScanDialog}
		bind:showModal={showArticleScanDialog}
		on:scanned={onScanned}
		scannedCode="334"
	/>

	<ScannButton on:click={() => (showArticleScanDialog = true)} />
</div>
