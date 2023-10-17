<script lang="ts">
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