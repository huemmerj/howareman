<script lang="ts">
	import Searchbox from "$lib/Searchbox.svelte";
	import ArticleItem from "$lib/article/ArticleItem.svelte";
	import CreateButton from "$lib/buttons/CreateButton.svelte";
	import AddToOrderListDialog from "$lib/dialogs/AddToOrderListDialog.svelte";
	import DeleteDialog from "$lib/dialogs/DeleteDialog.svelte";

	let deleteDialog: HTMLDialogElement;
    let addToOrderListDialog: HTMLDialogElement;

    let onDeleteConfirm = () => {
        console.log("delete confirmed");
        deleteDialog.close()
        showDeleteModal = false;
    }
	$:  showDeleteModal = false;
    $:  showAddToOrderListModal = false;
</script>
<h1 class="text-3xl pl-5 pt-5 pb-2.5">Artikel</h1>
<Searchbox/>
<div class="p-5 flex-row ">
    <div class="flex justify-end">
        <CreateButton/>
    </div>
    <ArticleItem on:delete={() => showDeleteModal=true} on:addToOrderList={() => showAddToOrderListModal= true }/>
    <ArticleItem on:delete={() => showDeleteModal=true}/>
    <ArticleItem on:delete={() => showDeleteModal=true}/>
    <ArticleItem on:delete={() => showDeleteModal=true}/>
    <ArticleItem on:delete={() => showDeleteModal=true}/>
    <ArticleItem on:delete={() => showDeleteModal=true}/>
    <ArticleItem on:delete={() => showDeleteModal=true}/>
    <ArticleItem on:delete={() => showDeleteModal=true}/>
    <ArticleItem on:delete={() => showDeleteModal=true}/>
    <ArticleItem on:delete={() => showDeleteModal=true}/>


    <DeleteDialog bind:dialog={deleteDialog} bind:showModal={showDeleteModal} on:delete={onDeleteConfirm} />
    <AddToOrderListDialog bind:dialog={addToOrderListDialog} bind:showModal={showAddToOrderListModal}/>
</div>