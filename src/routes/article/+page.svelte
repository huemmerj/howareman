<script lang="ts">
	import Searchbox from '$lib/Searchbox.svelte';
	import ArticleItem from '$lib/article/ArticleItem.svelte';
	import A from '$lib/buttons/A.svelte';
	import CreateButton from '$lib/buttons/CreateButton.svelte';
	import AddToOrderListDialog from '$lib/dialogs/AddToOrderListDialog.svelte';
	import DeleteDialog from '$lib/dialogs/DeleteDialog.svelte';
	import type Article from '../../models/article';

	let deleteDialog: HTMLDialogElement;
	let addToOrderListDialog: HTMLDialogElement;

	let onDeleteConfirm = () => {
		console.log('delete confirmed');
		deleteDialog.close();
		showDeleteModal = false;
	};
	$: showDeleteModal = false;
	$: showAddToOrderListModal = false;
	export let data: { data: Article[] };
	const articles = data.data;
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
				on:delete={() => (showDeleteModal = true)}
				on:addToOrderList={() => (showAddToOrderListModal = true)}
				{article}
			/>
		{/each}
	</div>
	<DeleteDialog
		bind:dialog={deleteDialog}
		bind:showModal={showDeleteModal}
		on:delete={onDeleteConfirm}
	/>
	<AddToOrderListDialog
		bind:dialog={addToOrderListDialog}
		bind:showModal={showAddToOrderListModal}
	/>
</div>
