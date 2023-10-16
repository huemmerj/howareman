<script lang="ts">
	import ArticleItem from "$lib/article/ArticleItem.svelte";
	import CreateButton from "$lib/buttons/CreateButton.svelte";
	import DeleteDialog from "$lib/dialogs/DeleteDialog.svelte";

	let dialog: HTMLDialogElement;

    let onDeleteConfirm = () => {
        console.log("delete confirmed");
        dialog.close()
        showModal = false;
    }
	$:  showModal = false;
</script>
<div class="p-5 flex-row ">
    <div class="flex justify-end">
        <CreateButton/>
    </div>
    <ArticleItem on:delete={() => showModal=true}/>
    <ArticleItem on:delete={() => showModal=true}/>
    <ArticleItem on:delete={() => showModal=true}/>
    <ArticleItem on:delete={() => showModal=true}/>
    <ArticleItem on:delete={() => showModal=true}/>
    <ArticleItem on:delete={() => showModal=true}/>
    <ArticleItem on:delete={() => showModal=true}/>
    <ArticleItem on:delete={() => showModal=true}/>
    <ArticleItem on:delete={() => showModal=true}/>
    <ArticleItem on:delete={() => showModal=true}/>
    <DeleteDialog bind:dialog bind:showModal on:delete={onDeleteConfirm} />
</div>