<script lang="ts">
	import Searchbox from '$lib/Searchbox.svelte';
	import CreateButton from '$lib/buttons/CreateButton.svelte';
	import ArticleCountDialog from '$lib/dialogs/ArticleCountDialog.svelte';
	import DeleteDialog from '$lib/dialogs/DeleteDialog.svelte';
	import StockTakingItem from '$lib/stockTaking/StockTakingItem.svelte';
	import type StockTaking from '../../models/stockTaking';

	export let data: { data: StockTaking[] };

	$: stockTakings = data.data;

	let showDeleteDialog: boolean;
	let showArticleCountDialog: boolean;

	let deleteDialog: HTMLDialogElement;
	let articleCountDialog: HTMLDialogElement;

	let currentStockTaking: StockTaking;

	$: search = '';
	let onDeleteConfirm = async (e: CustomEvent) => {
		console.log(e.detail);
		await fetch(`/stocktaking/${currentStockTaking.uuid}`, {
			method: 'DELETE'
		});
		deleteDialog.close();
		showDeleteDialog = false;
		await refetch();
		console.log(e);
	};
	const refetch = async () => {
		const res = await fetch('/stocktaking');
		stockTakings = await res.json();
	};
	let onSearch = async (e: CustomEvent<string>) => {
		console.log(e.detail);
		search = e.detail;
		const res = await fetch(`/stocktaking?name=${search}`);
		stockTakings = await res.json();
	};
</script>

<div class="p-5 flex-row">
	<h1 class="text-3xl pt-5 pb-2.5">Inventur</h1>
	<Searchbox on:search={onSearch} showScanButton={false}/>
	<div class="flex justify-end pt-5 pb-2.5">
		<CreateButton href="stocktaking/create" />
	</div>

	<div class="flex flex-col gap-5">
		{#each stockTakings as stockTaking}
			<StockTakingItem
				{stockTaking}
				on:delete={() => {
					currentStockTaking = stockTaking;
					showDeleteDialog = true;
				}}
				on:count={() => {
					currentStockTaking = stockTaking;
					showArticleCountDialog = true;
				}}
			/>
		{/each}
	</div>
	<DeleteDialog
		bind:dialog={deleteDialog}
		bind:showModal={showDeleteDialog}
		on:delete={onDeleteConfirm}
		headline="Wollen Sie die Inventur wirklich Löschen?"
	/>
	<ArticleCountDialog bind:stockTaking={currentStockTaking} bind:dialog={articleCountDialog} bind:showModal={showArticleCountDialog} />
</div>
